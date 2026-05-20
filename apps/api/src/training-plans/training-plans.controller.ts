import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TrainingPlansService } from './training-plans.service';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';
import { GenerateTrainingPlanDto } from './dto/generate-training-plan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticatedRequest } from '../auth/types/authenticated-request.type';

@Controller('training-plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TrainingPlansController {
  constructor(private readonly trainingPlansService: TrainingPlansService) { }

  @Post('generate')
  async generate(
    @Req() req: AuthenticatedRequest,
    @Body() dto: GenerateTrainingPlanDto
  ) {
    return await this.trainingPlansService.generate(req.user.userId, dto);

  }

  @Get('me')
  async findMine(@Req() req: AuthenticatedRequest) {
    return await this.trainingPlansService.findMine(req.user.userId);
  }

  @Get(':id')
  async findOne(
    @Req() req:AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number) {
    return await this.trainingPlansService.findOne(req.user.userId, id);
  }
}
