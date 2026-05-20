import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RunningRecordsService } from './running-records.service';
import { CreateRunningRecordDto } from './dto/create-running-record.dto';
import { UpdateRunningRecordDto } from './dto/update-running-record.dto';
import { AuthenticatedRequest } from '../auth/types/authenticated-request.type';

@ApiTags('running-records')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('running-records')
export class RunningRecordsController {
    constructor(private readonly runningRecordsService: RunningRecordsService) {}

    @Post()
    async create(
        @Req() req: AuthenticatedRequest,
        @Body() dto: CreateRunningRecordDto
    ){
        return this.runningRecordsService.create(req.user.userId, dto);
    }
    @Get('me')
    async findMine(@Req() req: AuthenticatedRequest){
        return this.runningRecordsService.findMine(req.user.userId);
    }

    @Patch(':id')
    async update(
        @Req() req: AuthenticatedRequest,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateRunningRecordDto
    ){
        return this.runningRecordsService.update(req.user.userId, id, dto);
    }

    @Delete(':id')
    async remove(
        @Req() req: AuthenticatedRequest,
        @Param('id', ParseIntPipe) id: number
    ){
        return this.runningRecordsService.remove(req.user.userId, id);
    }
}
