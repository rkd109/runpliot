import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from '../auth/types/authenticated-request.type';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { GenerateTrainingPlanDto } from './dto/generate-training-plan.dto';
import { TodayTrainingResponseDto } from './dto/today-training-response.dto';
import { TrainingPlanListResponseDto } from './dto/training-plan-list-response.dto';
import { TrainingPlanResponseDto } from './dto/training-plan-response.dto';
import { TrainingPlansService } from './training-plans.service';

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
    type: TrainingPlanResponseDto,
  })
  async generate(
    @Req() req: AuthenticatedRequest,
    @Body() dto: GenerateTrainingPlanDto,
  ) {
    return await this.trainingPlansService.generate(req.user.userId, dto);
  }

  @Get('me')
  @ApiOperation({
    summary: '내 훈련 계획 조회',
  })
  @ApiOkResponse({
    type: TrainingPlanListResponseDto,
  })
  async findMine(
    @Req() req: AuthenticatedRequest,
    @Query() query: PaginationQueryDto,
  ) {
    return await this.trainingPlansService.findMine(req.user.userId, query);
  }

  @Get('today')
  @ApiOperation({
    summary: '오늘 훈련 조회',
  })
  @ApiOkResponse({
    type: TodayTrainingResponseDto,
  })
  async findToday(
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.trainingPlansService.findToday(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: '훈련 계획 상세 조회',
  })
  @ApiOkResponse({
    type: TrainingPlanResponseDto,
  })
  async findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.trainingPlansService.findOne(req.user.userId, id);
  }
}
