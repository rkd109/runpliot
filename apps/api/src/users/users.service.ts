import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { toUserResponseDto } from './mapper/user.mapper';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    create = async (dto: CreateUserDto) => {
        const user = await this.prisma.user.create({
            data : {
                email: dto.email,
                nickname: dto.nickname,
                passwordHash: dto.passwordHash
            }
        })

        return toUserResponseDto(user);
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
