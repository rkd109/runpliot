import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    @IsEmail()
    @ApiProperty({ example: 'test@example.com', description: '이메일'  })
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    @ApiProperty({ example: 'jingu' , description: '별명' })
    nickname? : string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    @ApiProperty({ example: 'password', description: '이메일'  })
    password?: string;
}