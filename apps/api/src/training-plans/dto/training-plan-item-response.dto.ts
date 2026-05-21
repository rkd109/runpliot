import { ApiProperty } from "@nestjs/swagger";

export class TrainingPlanItemResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  planDate!: Date;

  @ApiProperty()
  workoutType!: string;

  @ApiProperty({
    nullable : true
  })
  distanceKm!: number | null;

  @ApiProperty({
    nullable : true
  })
  targetPaceSecPerKm!: number | null;

  @ApiProperty({
    nullable : true
  })
  description!: string | null;

  @ApiProperty()
  sortOrder!: number;
}