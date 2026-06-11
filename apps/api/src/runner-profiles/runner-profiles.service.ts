import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertRunnerProfileDto } from './dto/upsert-runner-profile.dto';
import { toRunnerProfileResponseDto } from './mappers/runner-profile.mapper';

@Injectable()
export class RunnerProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  findMine = async (userId: number) => {
    const profile = await this.prisma.runnerProfile.findUnique({
      where: {
        userId,
      },
    });

    return profile ? toRunnerProfileResponseDto(profile) : null;
  };

  upsertMine = async (userId: number, dto: UpsertRunnerProfileDto) => {
    const goal = dto.goal?.trim() || null;
    const planStartDate = dto.planStartDate ? new Date(dto.planStartDate) : null;

    const profile = await this.prisma.runnerProfile.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        experienceLevel: dto.experienceLevel,
        weeklyRunCount: dto.weeklyRunCount,
        comfortableDistanceKm: dto.comfortableDistanceKm,
        goal,
        planStartDate,
        preferredTrainingDays: dto.preferredTrainingDays,
      },
      update: {
        experienceLevel: dto.experienceLevel,
        weeklyRunCount: dto.weeklyRunCount,
        comfortableDistanceKm: dto.comfortableDistanceKm,
        goal,
        planStartDate,
        preferredTrainingDays: dto.preferredTrainingDays,
      },
    });

    return toRunnerProfileResponseDto(profile);
  };
}
