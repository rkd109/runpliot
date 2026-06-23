import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from './auth/auth.module';
import { RunningRecordsModule } from './running-records/running-records.module';
import { TrainingPlansModule } from './training-plans/training-plans.module';
import { RunnerProfilesModule } from './runner-profiles/runner-profiles.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env', 'apps/api/.env.local', 'apps/api/.env'],
    }),
    PrismaModule, AuthModule, RunningRecordsModule, TrainingPlansModule, RunnerProfilesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
