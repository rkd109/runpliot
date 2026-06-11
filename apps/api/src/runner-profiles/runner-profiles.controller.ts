import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/types/authenticated-request.type';
import { RunnerProfileResponseDto } from './dto/runner-profile-response.dto';
import { UpsertRunnerProfileDto } from './dto/upsert-runner-profile.dto';
import { RunnerProfilesService } from './runner-profiles.service';

@ApiTags('runner-profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('runner-profile')
export class RunnerProfilesController {
  constructor(private readonly runnerProfilesService: RunnerProfilesService) {}

  @Get('me')
  @ApiOkResponse({
    type: RunnerProfileResponseDto,
    description: 'Returns null when the current user has no runner profile yet.',
  })
  async findMine(@Req() req: AuthenticatedRequest) {
    return this.runnerProfilesService.findMine(req.user.userId);
  }

  @Put('me')
  @ApiOkResponse({
    type: RunnerProfileResponseDto,
  })
  async upsertMine(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpsertRunnerProfileDto,
  ) {
    return this.runnerProfilesService.upsertMine(req.user.userId, dto);
  }
}
