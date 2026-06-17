import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RunnerProfile, RunningRecord, TrainingPlan, TrainingPlanItem } from '../../generated/prisma';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { GenerateTrainingPlanDto } from './dto/generate-training-plan.dto';
import {
  toTodayTrainingResponseDto,
  toTrainingPlanResponseDto,
  TrainingPlanItemExecutionStatus,
  TrainingPlanWithItems,
} from './mappers/training-plan.mapper';

type TargetPeriod = {
  startDate: Date;
  endDate: Date;
};

type TrainingPlanSummary = {
  experienceLevel: string;
  weeklyRunCount: number;
  comfortableDistanceKm: number;
  preferredTrainingDays: string[];
  goal: string | null;
  recentRunCount: number;
  recentAverageDistanceKm: number;
  recentAveragePaceSecPerKm: number | null;
  targetStartDate: Date;
  targetEndDate: Date;
};

type TrainingPlanItemInput = {
  planDate: Date;
  workoutType: string;
  distanceKm: number | null;
  targetPaceSecPerKm: number | null;
  description: string;
  sortOrder: number;
};

type TrainingPlanWithPlainItems = TrainingPlan & {
  items: TrainingPlanItem[];
};

const DAY_TO_INDEX: Record<string, number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

@Injectable()
export class TrainingPlansService {
  constructor(private readonly prisma: PrismaService) { }

  async generate(userId: number, dto: GenerateTrainingPlanDto) {
    const runnerProfile = await this.prisma.runnerProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!runnerProfile) {
      throw new BadRequestException('RUNNER_PROFILE_REQUIRED');
    }

    const targetPeriod = this.getNextWeekPeriod();
    await this.assertNoOverlappingPlan(userId, targetPeriod);

    const records = await this.prisma.runningRecord.findMany({
      where: { userId },
      orderBy: { runDate: 'desc' },
      take: 5,
    });

    const summary = this.buildTrainingPlanSummary(
      runnerProfile,
      records,
      targetPeriod,
    );
    const items = this.createRuleBasedTrainingItems(summary);
    const title = dto.goal?.trim() || summary.goal || '다음 주 러닝 훈련 계획';

    const plan = await this.prisma.trainingPlan.create({
      data: {
        userId,
        title,
        goalType: 'GENERAL',
        level: summary.experienceLevel,
        startDate: targetPeriod.startDate,
        endDate: targetPeriod.endDate,
        sourceType: 'RULE_BASED',
        items: {
          create: items,
        },
      },
      include: {
        items: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
      },
    });

    const [planWithExecution] = await this.attachExecutionToPlans(userId, [plan]);

    return toTrainingPlanResponseDto(planWithExecution);
  }

  async findMine(userId: number, query: PaginationQueryDto) {
    const page = query.page;
    const limit = query.limit;
    const skip = (page - 1) * limit;
    const where = { userId };
    const [plans, total] = await this.prisma.$transaction([
      this.prisma.trainingPlan.findMany({
        where,
        include: {
          items: {
            orderBy: {
              sortOrder: 'asc'
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      }),
      this.prisma.trainingPlan.count({
        where,
      }),
    ]);
    const totalPages = Math.ceil(total / limit);
    const plansWithExecution = await this.attachExecutionToPlans(userId, plans);

    return {
      items: plansWithExecution.map(toTrainingPlanResponseDto),
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findOne(userId: number, id: number) {
    const plan = await this.prisma.trainingPlan.findFirst({
      where: {
        id, userId
      },
      include: {
        items: {
          orderBy: {
            sortOrder: 'asc'
          }
        }
      }
    });

    if (!plan) {
      throw new NotFoundException('training plan not found');
    }

    const [planWithExecution] = await this.attachExecutionToPlans(userId, [plan]);

    return toTrainingPlanResponseDto(planWithExecution);
  }

  async findToday(userId: number) {
    const todayStart = this.getStartOfDay(new Date());
    const todayEnd = this.getEndOfDay(new Date());
    const plan = await this.prisma.trainingPlan.findFirst({
      where: {
        userId,
        items: {
          some: {
            planDate: {
              gte: todayStart,
              lte: todayEnd,
            },
          },
        },
      },
      include: {
        items: {
          where: {
            planDate: {
              gte: todayStart,
              lte: todayEnd,
            },
          },
          orderBy: {
            sortOrder: 'asc',
          },
        },
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    if (!plan || plan.items.length === 0) {
      return null;
    }

    const [planWithExecution] = await this.attachExecutionToPlans(userId, [plan]);

    return toTodayTrainingResponseDto(planWithExecution, planWithExecution.items[0]);
  }

  private async attachExecutionToPlans(
    userId: number,
    plans: TrainingPlanWithPlainItems[],
  ): Promise<TrainingPlanWithItems[]> {
    if (plans.length === 0) {
      return [];
    }

    const planDates = plans.flatMap((plan) => plan.items.map((item) => item.planDate));

    if (planDates.length === 0) {
      return plans;
    }

    const startDate = this.getStartOfDay(
      new Date(Math.min(...planDates.map((planDate) => planDate.getTime()))),
    );
    const endDate = this.getEndOfDay(
      new Date(Math.max(...planDates.map((planDate) => planDate.getTime()))),
    );
    const runningRecords = await this.prisma.runningRecord.findMany({
      where: {
        userId,
        runDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        runDate: 'asc',
      },
    });
    const recordByDateKey = this.createRunningRecordByDateKey(runningRecords);
    const todayStart = this.getStartOfDay(new Date());

    return plans.map((plan) => ({
      ...plan,
      items: plan.items.map((item) => {
        const actualRecord = recordByDateKey.get(this.getDateKey(item.planDate)) ?? null;
        const executionStatus = this.getExecutionStatus(item.planDate, actualRecord, todayStart);

        return {
          ...item,
          actualRecord,
          executionStatus,
        };
      }),
    }));
  }

  private createRunningRecordByDateKey(records: RunningRecord[]): Map<string, RunningRecord> {
    return records.reduce((recordMap, record) => {
      const dateKey = this.getDateKey(record.runDate);
      const existingRecord = recordMap.get(dateKey);

      if (!existingRecord || record.distanceKm > existingRecord.distanceKm) {
        recordMap.set(dateKey, record);
      }

      return recordMap;
    }, new Map<string, RunningRecord>());
  }

  private getExecutionStatus(
    planDate: Date,
    actualRecord: RunningRecord | null,
    todayStart: Date,
  ): TrainingPlanItemExecutionStatus {
    if (actualRecord) {
      return 'COMPLETED';
    }

    if (this.getStartOfDay(planDate).getTime() < todayStart.getTime()) {
      return 'MISSED';
    }

    return 'PLANNED';
  }

  private buildTrainingPlanSummary(
    runnerProfile: RunnerProfile,
    recentRecords: RunningRecord[],
    targetPeriod: TargetPeriod,
  ): TrainingPlanSummary {
    const recentTotalDistanceKm = recentRecords.reduce(
      (sum, record) => sum + record.distanceKm,
      0,
    );
    const recentTotalDurationSeconds = recentRecords.reduce(
      (sum, record) => sum + record.durationSec,
      0,
    );
    const recentAverageDistanceKm =
      recentRecords.length === 0 ? 0 : recentTotalDistanceKm / recentRecords.length;
    const recentAveragePaceSecPerKm =
      recentTotalDistanceKm === 0
        ? null
        : Math.floor(recentTotalDurationSeconds / recentTotalDistanceKm);

    return {
      experienceLevel: runnerProfile.experienceLevel,
      weeklyRunCount: runnerProfile.weeklyRunCount,
      comfortableDistanceKm: runnerProfile.comfortableDistanceKm,
      preferredTrainingDays: runnerProfile.preferredTrainingDays,
      goal: runnerProfile.goal,
      recentRunCount: recentRecords.length,
      recentAverageDistanceKm,
      recentAveragePaceSecPerKm,
      targetStartDate: targetPeriod.startDate,
      targetEndDate: targetPeriod.endDate,
    };
  }

  private createRuleBasedTrainingItems(summary: TrainingPlanSummary): TrainingPlanItemInput[] {
    const trainingDates = this.getTrainingDates(summary);
    const workoutTypes = this.getWorkoutTypes(summary, trainingDates.length);

    return trainingDates.map((planDate, index) => {
      const workoutType = workoutTypes[index];
      const distanceKm = this.getWorkoutDistanceKm(summary, workoutType, index, trainingDates.length);

      return {
        planDate,
        workoutType,
        distanceKm,
        targetPaceSecPerKm: summary.recentAveragePaceSecPerKm,
        description: this.getWorkoutDescription(workoutType),
        sortOrder: index + 1,
      };
    });
  }

  private getTrainingDates(summary: TrainingPlanSummary): Date[] {
    const targetCount = Math.min(Math.max(summary.weeklyRunCount, 1), 7);
    const preferredDayIndexes = summary.preferredTrainingDays
      .map((day) => DAY_TO_INDEX[day])
      .filter((dayIndex): dayIndex is number => dayIndex !== undefined);
    const fallbackDayIndexes = [1, 2, 3, 4, 5, 6, 0];
    const dayIndexes = [...new Set([...preferredDayIndexes, ...fallbackDayIndexes])]
      .slice(0, targetCount);

    return dayIndexes
      .map((dayIndex) => this.getDateInTargetWeek(summary.targetStartDate, dayIndex))
      .sort((first, second) => first.getTime() - second.getTime());
  }

  private getWorkoutTypes(summary: TrainingPlanSummary, count: number): string[] {
    if (count === 1) {
      return ['EASY_RUN'];
    }

    if (count === 2) {
      return ['EASY_RUN', 'LONG_RUN'];
    }

    const workoutTypes = ['EASY_RUN', 'TEMPO_RUN'];

    if (summary.experienceLevel === 'ADVANCED' && count >= 4) {
      workoutTypes.push('EASY_RUN');
    }

    while (workoutTypes.length < count - 1) {
      workoutTypes.push('RECOVERY_RUN');
    }

    workoutTypes.push('LONG_RUN');

    return workoutTypes.slice(0, count);
  }

  private getWorkoutDistanceKm(
    summary: TrainingPlanSummary,
    workoutType: string,
    index: number,
    workoutCount: number,
  ): number {
    const baseDistanceKm = Math.max(
      summary.comfortableDistanceKm,
      summary.recentAverageDistanceKm || 0,
      2,
    );
    const levelMultiplier =
      summary.experienceLevel === 'ADVANCED'
        ? 1.15
        : summary.experienceLevel === 'INTERMEDIATE'
          ? 1
          : 0.8;
    const workoutMultiplier = this.getWorkoutDistanceMultiplier(workoutType);
    const progressionMultiplier = workoutCount <= 1 ? 1 : 1 + (index / (workoutCount - 1)) * 0.15;
    const distanceKm = baseDistanceKm * levelMultiplier * workoutMultiplier * progressionMultiplier;

    return Math.max(Math.round(distanceKm * 10) / 10, 1);
  }

  private getWorkoutDistanceMultiplier(workoutType: string): number {
    if (workoutType === 'LONG_RUN') {
      return 1.35;
    }

    if (workoutType === 'TEMPO_RUN') {
      return 0.9;
    }

    if (workoutType === 'RECOVERY_RUN') {
      return 0.65;
    }

    return 1;
  }

  private getWorkoutDescription(workoutType: string): string {
    if (workoutType === 'LONG_RUN') {
      return '주간 가장 긴 거리로 여유 있게 달립니다.';
    }

    if (workoutType === 'TEMPO_RUN') {
      return '편한 속도보다 살짝 빠르게 유지합니다.';
    }

    if (workoutType === 'RECOVERY_RUN') {
      return '몸을 회복하는 가벼운 러닝입니다.';
    }

    return '무리하지 않는 편안한 러닝입니다.';
  }

  private async assertNoOverlappingPlan(userId: number, targetPeriod: TargetPeriod) {
    const overlappingPlan = await this.prisma.trainingPlan.findFirst({
      where: {
        userId,
        startDate: {
          lte: targetPeriod.endDate,
        },
        endDate: {
          gte: targetPeriod.startDate,
        },
      },
    });

    if (overlappingPlan) {
      throw new ConflictException('TRAINING_PLAN_ALREADY_EXISTS');
    }
  }

  private getNextWeekPeriod(): TargetPeriod {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const currentDayIndex = startDate.getDay();
    const daysUntilNextMonday = ((8 - currentDayIndex) % 7) || 7;
    startDate.setDate(startDate.getDate() + daysUntilNextMonday);

    const endDate = this.addDays(startDate, 6);
    endDate.setHours(23, 59, 59, 999);

    return {
      startDate,
      endDate,
    };
  }

  private getDateInTargetWeek(startDate: Date, dayIndex: number): Date {
    const targetDate = new Date(startDate);
    const startDayIndex = startDate.getDay();
    const offset = (dayIndex - startDayIndex + 7) % 7;
    targetDate.setDate(startDate.getDate() + offset);
    targetDate.setHours(0, 0, 0, 0);

    return targetDate;
  }

  private getStartOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  private getEndOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  }

  private getDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
