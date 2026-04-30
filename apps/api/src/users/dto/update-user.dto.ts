import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto{
    @ApiProperty({ example: 'jingu' })

    nickname? : string;
}