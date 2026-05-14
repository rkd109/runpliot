import { RunningRecord } from "../../../generated/prisma";
import { RunningRecordResponseDto } from "../dto/running-record-response.dto";

export const toRunningRecordResponseDto = (record: RunningRecord):RunningRecordResponseDto => {
    return {
        id: record.id,
        runDate: record.runDate,
        distanceKm: record.distanceKm,
        durationSeconds: record.durationSec,
        memo: record.memo,
        createAt: record.createdAt,
        updateAt: record.updatedAt
    }
}