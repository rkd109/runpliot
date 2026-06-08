import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from './auth/auth.module';
import { RunningRecordsModule } from './running-records/running-records.module';
import { TrainingPlansModule } from './training-plans/training-plans.module';

@Module({
  imports: [PrismaModule, AuthModule, RunningRecordsModule, TrainingPlansModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
