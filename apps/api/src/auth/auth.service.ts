import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { SignupDto } from './dto/signup.dto';

const SALT_ROUNDS = 10;

type JwtPayload = {
    sub: number;
    email: string;
};

type PrismaKnownError = {
    code: string;
    meta?: unknown;
};

const isPrismaKnownError = (error: unknown): error is PrismaKnownError => {
    return typeof error === 'object' && error !== null && 'code' in error;
};

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ){}

    signup = async (dto: SignupDto): Promise<LoginResponseDto> => {
        const existsByEmail = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if(existsByEmail){
            throw new ConflictException('이미 사용 중인 이메일입니다.');
        }

        const nickname = dto.nickname?.trim() || undefined;

        if(nickname){
            const existsByNickname = await this.prisma.user.findFirst({
                where: {
                    nickname
                }
            });

            if(existsByNickname){
                throw new ConflictException('이미 사용 중인 닉네임입니다.');
            }
        }

        try{
            const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    nickname,
                    passwordHash
                }
            });

            return this.signAccessToken({
                sub: user.id,
                email: user.email
            });
        }catch(error: unknown){
            if(isPrismaKnownError(error) && error.code === 'P2002'){
                throw new ConflictException('이미 사용 중인 값입니다.');
            }

            throw error;
        }
    }

    login = async (dto: LoginDto): Promise<LoginResponseDto> => {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if(!user){
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        const isPasswordValid = await bcrypt.compare(
            dto.password,
            user.passwordHash
        );

        if(!isPasswordValid){
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        return this.signAccessToken({
            sub: user.id,
            email: user.email
        });
    }

    private signAccessToken = async (payload: JwtPayload): Promise<LoginResponseDto> => {
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken
        };
    }
}
