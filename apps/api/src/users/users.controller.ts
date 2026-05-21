import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiConflictResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post()
    @ApiConflictResponse({
        description: '이미 사용 중인 이메일',
    })
    @ApiOkResponse({
        type: UserResponseDto
    })
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Get()
    @ApiOkResponse({
        type: UserResponseDto,
        isArray: true
    })
    findAll() {
        return this.userService.findAll();
    }

    @Get(':email')
    @ApiOkResponse({
        type: UserResponseDto
    })
    findOne(@Param('email') email: string) {
        return this.userService.findOne(email);
    }

    @Patch(':email')
    @ApiConflictResponse({
        description: '이미 사용 중인 별명',
    })
    update(@Param('email') email: string, @Body() dto: UpdateUserDto) {
        return this.userService.update(email, dto);
    }

    @Delete(':email')
    remove(@Param('email') email: string) {
        return this.userService.remove(email);
    }
}
