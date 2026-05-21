import { ApiProperty } from "@nestjs/swagger";
import { TrainingPlanItemResponseDto } from "./training-plan-item-response.dto";

export class TrainingPlanResponseDto {
    @ApiProperty()
    id!: number;

    @ApiProperty()
    title!: string;

    @ApiProperty()
    goalType!: string;

    @ApiProperty()
    level!: string;

    @ApiProperty()
    startDate!: Date;

    @ApiProperty()
    endDate!: Date;

    @ApiProperty()
    sourceType!: string;

    @ApiProperty()
    createdAt!: Date;
    
    @ApiProperty()
    updatedAt!: Date;

    @ApiProperty({
        type: TrainingPlanItemResponseDto,
        isArray : true
    })
    items!: TrainingPlanItemResponseDto[]
}