import { ApiProperty } from "@nestjs/swagger";
import { TrainingPlanItemResponseDto } from "./training-plan-item-response.dto";

export class TodayTrainingResponseDto {
  @ApiProperty()
  planId!: number;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  startDate!: Date;

  @ApiProperty()
  endDate!: Date;

  @ApiProperty({
    type: TrainingPlanItemResponseDto,
  })
  item!: TrainingPlanItemResponseDto;
}
