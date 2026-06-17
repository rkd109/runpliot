import { ApiProperty } from "@nestjs/swagger";
import { RunningRecordResponseDto } from "../../running-records/dto/running-record-response.dto";

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

  @ApiProperty({
    enum: ['PLANNED', 'COMPLETED', 'MISSED'],
  })
  executionStatus!: string;

  @ApiProperty({
    type: RunningRecordResponseDto,
    nullable: true,
  })
  actualRecord!: RunningRecordResponseDto | null;
}
