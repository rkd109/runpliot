import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthenticatedRequest } from './types/authenticated-request.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @ApiOkResponse({
        type: LoginResponseDto,
        description: '성공'
    })
    @ApiUnauthorizedResponse({
        description : '이메일 또는 비밀번호가 올바르지 않음'
    })
    async login(@Body() dto: LoginDto): Promise<LoginResponseDto>{
        return this.authService.login(dto);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({
        description:'현재 로그인 사용자 정보'
    })
    @ApiUnauthorizedResponse({
        description: '인증 실패'
    })
    async getMe(@Req() req: AuthenticatedRequest){
        return req.user;
    }

}
