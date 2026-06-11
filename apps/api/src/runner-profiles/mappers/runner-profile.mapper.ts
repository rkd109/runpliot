import { RunnerProfile } from '../../../generated/prisma';
import { RunnerProfileResponseDto } from '../dto/runner-profile-response.dto';

export const toRunnerProfileResponseDto = (
  profile: RunnerProfile,
): RunnerProfileResponseDto => ({
  id: profile.id,
  experienceLevel: profile.experienceLevel,
  weeklyRunCount: profile.weeklyRunCount,
  comfortableDistanceKm: profile.comfortableDistanceKm,
  goal: profile.goal,
  planStartDate: profile.planStartDate,
  preferredTrainingDays: profile.preferredTrainingDays,
  createdAt: profile.createdAt,
  updatedAt: profile.updatedAt,
});
