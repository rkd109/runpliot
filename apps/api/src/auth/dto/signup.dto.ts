import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class SignupDto {
    @IsEmail()
    @ApiProperty({
        example: 'runner@example.com',
        description: 'email'
    })
    email!: string;

    @IsString()
    @MinLength(8)
    @ApiProperty({
        example: 'password123',
        description: 'password'
    })
    password!: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    @ApiPropertyOptional({
        example: 'runner',
        description: 'nickname'
    })
    nickname?: string;
}
