import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { toUserResponseDto } from './mapper/user.mapper';

type PrismaKnownError = {
  code: string;
  meta?: unknown;
};

const isPrismaKnownError = (error: unknown): error is PrismaKnownError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error
  );
};

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    create = async (dto: CreateUserDto) => {

        const existsByEmail = await this.prisma.user.findUnique({
            where: {email: dto.email}
        });

        if(existsByEmail){
            throw new ConflictException('이미 사용중인 이메일입니다.');
        }

        if(dto.nickname){
            const existsByNickname = await this.prisma.user.findFirst({
                where: {nickname: dto.nickname}
            });

            if(existsByNickname){
                throw new ConflictException('이미 사용중인 별명입니다.');
            }
        }

        try{
            const user = await this.prisma.user.create({
                data : {
                    email: dto.email,
                    nickname: dto.nickname,
                    passwordHash: dto.password
                }
            })

            return toUserResponseDto(user);
        }catch(error: unknown){
            if(isPrismaKnownError(error) && error.code === "P2002"){
                throw new ConflictException('이미 사용중인 값입니다.');
            }
            throw error;
        }
    }

    findAll = async () => {
        const users = await this.prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return users.map((user) => toUserResponseDto(user));
    }

    findOne = async (email: string) =>{
        const user = await this.prisma.user.findUnique({
           where: { email }
        });

        if(user === null){
            return null;
        }

        return toUserResponseDto(user);

    }

    update = async (email: string, dto: UpdateUserDto) => {

        if(dto.nickname){
            const existsByNickname = await this.prisma.user.findFirst({
                where: {nickname: dto.nickname}
            });

            if(existsByNickname){
                throw new ConflictException('이미 사용중인 별명입니다.');
            }
        }

        const user = await this.prisma.user.update({
            where: {email},
            data : {
                nickname: dto.nickname
            }
        });
        return toUserResponseDto(user);
    };

    remove = async (email: string) => {
        const user = await this.prisma.user.delete({
            where: { email }
        });

        return toUserResponseDto(user);
    };
}
