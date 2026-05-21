export class TrainingPlanItemResponseDto {
  id!: number;
  planDate!: Date;
  workoutType!: string;
  distanceKm!: number | null;
  targetPaceSecPerKm!: number | null;
  description!: string | null;
  sortOrder!: number;
}