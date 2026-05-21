import { Injectable, NotFoundException } from '@nestjs/common';
import { GenerateTrainingPlanDto } from './dto/generate-training-plan.dto';
import { PrismaService } from '../prisma/prisma.service';
import { toTrainingPlanResponseDto } from './mappers/training-plan.mapper';

@Injectable()
export class TrainingPlansService {
  constructor(private readonly prisma: PrismaService) { }

  async generate(userId: number, dto: GenerateTrainingPlanDto) {
    const records = await this.prisma.runningRecord.findMany({
      where: { userId },
      orderBy: { runDate: 'desc' },
      take: 5,
    });

    const averageDistance =
      records.length === 0
        ? 0
        : records.reduce((sum, record) => sum + record.distanceKm, 0) /
        records.length;

    const startDate = new Date();
    const endDate = this.addDays(startDate, 6);
    const items = this.createWeeklyItems(startDate, averageDistance);

    const plan = await this.prisma.trainingPlan.create({
      data: {
        userId,
        title: dto.goal ?? '주간 러닝 훈련 계획',
        goalType: 'GENERAL',
        level: this.getLevel(averageDistance),
        startDate,
        endDate,
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

    return toTrainingPlanResponseDto(plan);
  }

  async findMine(userId: number) {
    const plans = await this.prisma.trainingPlan.findMany({
      where: { userId },
      include: {
        items: {
          orderBy: {
            sortOrder: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return plans.map(toTrainingPlanResponseDto);
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

    return toTrainingPlanResponseDto(plan);
  }

  private createWeeklyItems(startDate: Date, averageDistance: number) {
    if (averageDistance < 3) {
      return [
        {
          planDate: this.addDays(startDate, 0),
          workoutType: 'REST',
          distanceKm: null,
          targetPaceSecPerKm: null,
          description: '휴식',
          sortOrder: 1,
        },
        {
          planDate: this.addDays(startDate, 1),
          workoutType: 'EASY_RUN',
          distanceKm: 2,
          targetPaceSecPerKm: null,
          description: '가볍게 달리기',
          sortOrder: 2,
        },
        {
          planDate: this.addDays(startDate, 3),
          workoutType: 'EASY_RUN',
          distanceKm: 3,
          targetPaceSecPerKm: null,
          description: '천천히 거리 늘리기',
          sortOrder: 3,
        },
        {
          planDate: this.addDays(startDate, 5),
          workoutType: 'LONG_RUN',
          distanceKm: 4,
          targetPaceSecPerKm: null,
          description: '주간 롱런',
          sortOrder: 4,
        },
      ];
    }

    if (averageDistance < 7) {
      return [
        {
          planDate: this.addDays(startDate, 0),
          workoutType: 'REST',
          distanceKm: null,
          targetPaceSecPerKm: null,
          description: '휴식',
          sortOrder: 1,
        },
        {
          planDate: this.addDays(startDate, 1),
          workoutType: 'EASY_RUN',
          distanceKm: 4,
          targetPaceSecPerKm: null,
          description: '이지런',
          sortOrder: 2,
        },
        {
          planDate: this.addDays(startDate, 3),
          workoutType: 'TEMPO_RUN',
          distanceKm: 5,
          targetPaceSecPerKm: null,
          description: '템포런',
          sortOrder: 3,
        },
        {
          planDate: this.addDays(startDate, 5),
          workoutType: 'LONG_RUN',
          distanceKm: 8,
          targetPaceSecPerKm: null,
          description: '롱런',
          sortOrder: 4,
        },
      ];
    }

    return [
      {
        planDate: this.addDays(startDate, 0),
        workoutType: 'REST',
        distanceKm: null,
        targetPaceSecPerKm: null,
        description: '휴식',
        sortOrder: 1,
      },
      {
        planDate: this.addDays(startDate, 1),
        workoutType: 'EASY_RUN',
        distanceKm: 5,
        targetPaceSecPerKm: null,
        description: '이지런',
        sortOrder: 2,
      },
      {
        planDate: this.addDays(startDate, 3),
        workoutType: 'TEMPO_RUN',
        distanceKm: 7,
        targetPaceSecPerKm: null,
        description: '템포런',
        sortOrder: 3,
      },
      {
        planDate: this.addDays(startDate, 5),
        workoutType: 'LONG_RUN',
        distanceKm: 12,
        targetPaceSecPerKm: null,
        description: '롱런',
        sortOrder: 4,
      },
      {
        planDate: this.addDays(startDate, 6),
        workoutType: 'RECOVERY_RUN',
        distanceKm: 4,
        targetPaceSecPerKm: null,
        description: '회복주',
        sortOrder: 5,
      },
    ];
  }

  private getLevel(averageDistance: number): string {
    if (averageDistance < 3) {
      return 'BEGINNER';
    }

    if (averageDistance < 7) {
      return 'INTERMEDIATE';
    }

    return 'ADVANCED';
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
