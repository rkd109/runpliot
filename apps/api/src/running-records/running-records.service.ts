import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRunningRecordDto } from './dto/create-running-record.dto';
import { UpdateRunningRecordDto } from './dto/update-running-record.dto';
import { toRunningRecordResponseDto } from './mapper/running-record.mapper';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class RunningRecordsService {
    constructor(private readonly prisma: PrismaService){}

    create = async(userId: number, dto: CreateRunningRecordDto) => {
        const paceSecPerKm = this.calculatePaceSecPerKm(
            dto.durationSeconds,
            dto.distanceKm,
        );

        const record = await this.prisma.runningRecord.create({
            data: {
                userId,
                runDate: new Date(dto.runDate),
                distanceKm: dto.distanceKm,
                durationSec: dto.durationSeconds,
                memo: dto.memo,
                paceSecPerKm,
            }
        });

        return toRunningRecordResponseDto(record);
    }

    findMine = async(userId: number, query: PaginationQueryDto) => {
        const page = query.page;
        const limit = query.limit;
        const skip = (page - 1) * limit;
        const where = { userId };
        const [records, total] = await this.prisma.$transaction([
            this.prisma.runningRecord.findMany({
                where,
                orderBy: { runDate : 'desc'},
                skip,
                take: limit,
            }),
            this.prisma.runningRecord.count({
                where,
            }),
        ]);
        const totalPages = Math.ceil(total / limit);

        return {
            items: records.map(toRunningRecordResponseDto),
            meta: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }

    update = async(userId: number, id: number, dto: UpdateRunningRecordDto) => {
        const records = await this.prisma.runningRecord.findFirst({
            where : {userId, id}
        })

        if(!records){
            throw new NotFoundException('not found records');
        }


        const distanceKm = dto.distanceKm ?? records.distanceKm;
        const durationSeconds = dto.durationSeconds ?? records.durationSec;
        const paceSecPerKm = this.calculatePaceSecPerKm(
            durationSeconds,
            distanceKm,
        );

        const updated = await this.prisma.runningRecord.update({
            where: { id },
            data : {
                runDate: dto.runDate ? new Date(dto.runDate) : undefined,
                distanceKm : dto.distanceKm,
                durationSec : dto.durationSeconds,
                paceSecPerKm,
                memo : dto.memo
            }
        })
        return toRunningRecordResponseDto(updated);
    }

    remove = async(userId: number, id: number) => {
        const record = await this.prisma.runningRecord.findFirst({
            where: {id, userId}
        });

        if(!record){
            throw new NotFoundException('running record not found');
        }

        await this.prisma.runningRecord.delete({
            where : {id}
        });

        return { deleted : true };
    }

    private calculatePaceSecPerKm(durationSeconds: number, distanceKm: number): number {
        return Math.floor(durationSeconds / distanceKm);
    }
}
