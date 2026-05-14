import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

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

}
