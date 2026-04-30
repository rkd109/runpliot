import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    create = async (dto: CreateUserDto) => {
        return this.prisma.user.create({
            data : {
                email: dto.email,
                nickname: dto.nickname,
                passwordHash: dto.passwordHash
            }
        })
    }

    findAll = async () => {
        return this.prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    findOne = async (email: string) =>{
        return this.prisma.user.findUnique({
           where: { email } 
        });
    }

    update = async (email: string, dto: UpdateUserDto) => {
        return this.prisma.user.update({
            where: {email},
            data : {
                nickname: dto.nickname
            }
        });
    };

    remove = async (email: string) => {
        return this.prisma.user.delete({
            where: { email }
        });
    };
}
