import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @ApiProperty({ example: 'test@example.com', description: '이메일'  })
    email!: string;

    @IsString()
    @MinLength(2)
    @ApiProperty({ example: 'jingu' , description: '별명' })
    nickname!: string;

    @IsString()
    @MinLength(8)
    @ApiProperty({ example: 'password', description: '이메일'  })
    password!: string;
}