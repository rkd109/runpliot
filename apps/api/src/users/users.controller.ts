import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiConflictResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    @ApiConflictResponse({
        description: '이미 사용 중인 이메일',
    })
    create(@Body() dto: CreateUserDto){
        return this.userService.create(dto);
    }

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(':email')
    findOne(@Param('email') email: string){
        return this.userService.findOne(email);
    }

    @Patch(':email')
    @ApiConflictResponse({
        description: '이미 사용 중인 별명',
    })
    update(@Param('email') email: string, @Body() dto: UpdateUserDto){
        return this.userService.update(email, dto);
    }

    @Delete(':email')
    remove(@Param('email') email: string){
        return this.userService.remove(email);
    }
}
