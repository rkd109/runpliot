import { TrainingPlanItemResponseDto } from "./training-plan-item-response.dto";

export class TrainingPlanResponseDto {
    id!: number;
    title!: string;
    goalType!: string;
    level!: string;
    startDate!: Date;
    endDate!: Date;
    sourceType!: string;
    createdAt!: Date;
    updatedAt!: Date;

    items!: TrainingPlanItemResponseDto[]
}