import { TrainingPlan, TrainingPlanItem } from "../../../generated/prisma";
import { TrainingPlanItemResponseDto } from "../dto/training-plan-item-response.dto";
import { TrainingPlanResponseDto } from "../dto/training-plan-response.dto";

export const toTrainingPlanItemResponseDto = (
    item: TrainingPlanItem
): TrainingPlanItemResponseDto => ({
    id: item.id,
    planDate: item.planDate,
    workoutType: item.workoutType,
    distanceKm: item.distanceKm,
    targetPaceSecPerKm: item.targetPaceSecPerKm,
    description: item.description,
    sortOrder: item.sortOrder,
});

type TrainingPlanWithItems = TrainingPlan & {
    items: TrainingPlanItem[];
}

export const toTrainingPlanResponseDto = (
    plan: TrainingPlanWithItems
): TrainingPlanResponseDto => ({
    id: plan.id,
    title: plan.title,
    goalType: plan.goalType,
    level: plan.level,
    startDate: plan.startDate,
    endDate: plan.endDate,
    sourceType: plan.sourceType,
    createdAt: plan.createdAt,
    updatedAt: plan.updatedAt,

    items: plan.items.map(toTrainingPlanItemResponseDto)
});