import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ){}

    login = async (dto: LoginDto): Promise<LoginResponseDto> => {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if(!user){
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');
        }

        const isPasswordValid = await bcrypt.compare(
            dto.password,
            user.passwordHash
        );

        if(!isPasswordValid){
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');
        }

        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email
        })

        return {
            accessToken
        }
    }
}
