import { Module } from '@nestjs/common';
import { RunningRecordsController } from './running-records.controller';
import { RunningRecordsService } from './running-records.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RunningRecordsController],
  providers: [RunningRecordsService]
})
export class RunningRecordsModule {}
