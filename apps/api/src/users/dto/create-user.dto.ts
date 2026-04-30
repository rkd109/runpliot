import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({ example: 'test@example.com', description: '이메일'  })
    email!: string;

    @ApiProperty({ example: 'jingu' , description: '별명' })
    nickname!: string;

    @ApiProperty({ example: 'hash-password', description: '이메일'  })
    passwordHash!: string;
}