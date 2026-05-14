import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRunningRecordDto } from './dto/create-running-record.dto';
import { UpdateRunningRecordDto } from './dto/update-running-record.dto';
import { toRunningRecordResponseDto } from './mapper/running-record.mapper';

@Injectable()
export class RunningRecordsService {
    constructor(private readonly prisma: PrismaService){}

    create = async(userId: number, dto: CreateRunningRecordDto) => {
        const record = await this.prisma.runningRecord.create({
            data: {
                userId,
                runDate: new Date(dto.runDate),
                distanceKm: dto.distanceKm,
                durationSec: dto.durationSeconds,
                memo: dto.memo,
                paceSecPerKm: 0
            }
        });

        return toRunningRecordResponseDto(record);
    }

    findMine = async(userId: number) => {
        const records = await this.prisma.runningRecord.findMany({
            where: { userId },
            orderBy: { runDate : 'desc'}
        })

        return records.map(toRunningRecordResponseDto);
    }

    update = async(userId: number, id: number, dto: UpdateRunningRecordDto) => {
        const records = await this.prisma.runningRecord.findFirst({
            where : {userId, id}
        })

        if(!records){
            throw new NotFoundException('not found records');
        }


        const updated = await this.prisma.runningRecord.update({
            where: { id },
            data : {
                runDate: dto.runDate ? new Date(dto.runDate) : undefined,
                distanceKm : dto.distanceKm,
                durationSec : dto.durationSeconds,
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
}
