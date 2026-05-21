import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TrainingPlansService } from './training-plans.service';
import { GenerateTrainingPlanDto } from './dto/generate-training-plan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from '../auth/types/authenticated-request.type';
import { TrainingPlanResponseDto } from './dto/training-plan-response.dto';
import { TrainingPlanItemResponseDto } from './dto/training-plan-item-response.dto';

@ApiTags('training-plans')
@Controller('training-plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TrainingPlansController {
  constructor(private readonly trainingPlansService: TrainingPlansService) { }


  @Post('generate')
  @ApiOperation({
    summary: '훈련 계획 생성',
  })
  @ApiOkResponse({
    type: TrainingPlanResponseDto
  })
  async generate(
    @Req() req: AuthenticatedRequest,
    @Body() dto: GenerateTrainingPlanDto
  ) {
    return await this.trainingPlansService.generate(req.user.userId, dto);

  }
  @ApiOperation({
    summary: '내 훈련 계획 조회',
  })
  @ApiOkResponse({
    type: TrainingPlanResponseDto,
    isArray: true
  })
  @Get('me')
  async findMine(@Req() req: AuthenticatedRequest) {
    return await this.trainingPlansService.findMine(req.user.userId);
  }

  @ApiOperation({
    summary: '훈련 계획 상세 조회',
  })
  @ApiOkResponse({
    type: TrainingPlanResponseDto
  })
  @Get(':id')
  async findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number) {
    return await this.trainingPlansService.findOne(req.user.userId, id);
  }
}
