import { RunningRecord, TrainingPlan, TrainingPlanItem } from "../../../generated/prisma";
import { toRunningRecordResponseDto } from "../../running-records/mapper/running-record.mapper";
import { TodayTrainingResponseDto } from "../dto/today-training-response.dto";
import { TrainingPlanItemResponseDto } from "../dto/training-plan-item-response.dto";
import { TrainingPlanResponseDto } from "../dto/training-plan-response.dto";

export type TrainingPlanItemExecutionStatus = 'PLANNED' | 'COMPLETED' | 'MISSED';

export type TrainingPlanItemWithExecution = TrainingPlanItem & {
    executionStatus?: TrainingPlanItemExecutionStatus;
    actualRecord?: RunningRecord | null;
};

export type TrainingPlanWithItems = TrainingPlan & {
    items: TrainingPlanItemWithExecution[];
}

export const toTrainingPlanItemResponseDto = (
    item: TrainingPlanItemWithExecution
): TrainingPlanItemResponseDto => ({
    id: item.id,
    planDate: item.planDate,
    workoutType: item.workoutType,
    distanceKm: item.distanceKm,
    targetPaceSecPerKm: item.targetPaceSecPerKm,
    description: item.description,
    sortOrder: item.sortOrder,
    executionStatus: item.executionStatus ?? 'PLANNED',
    actualRecord: item.actualRecord ? toRunningRecordResponseDto(item.actualRecord) : null,
});

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

export const toTodayTrainingResponseDto = (
    plan: TrainingPlanWithItems,
    item: TrainingPlanItemWithExecution
): TodayTrainingResponseDto => ({
    planId: plan.id,
    title: plan.title,
    startDate: plan.startDate,
    endDate: plan.endDate,
    item: toTrainingPlanItemResponseDto(item),
});
