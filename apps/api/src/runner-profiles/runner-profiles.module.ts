import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RunnerProfilesController } from './runner-profiles.controller';
import { RunnerProfilesService } from './runner-profiles.service';

@Module({
  imports: [PrismaModule],
  controllers: [RunnerProfilesController],
  providers: [RunnerProfilesService],
  exports: [RunnerProfilesService],
})
export class RunnerProfilesModule {}
