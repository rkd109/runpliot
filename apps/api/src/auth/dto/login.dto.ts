import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto{
    @IsEmail()
    @ApiProperty({
        example: 'test@example.com',
        description : 'email'
    })
    email!: string;

    @IsString()
    @MinLength(8)
    @ApiProperty({
        example: 'password',
        description: 'password'
    })
    password!: string;
}