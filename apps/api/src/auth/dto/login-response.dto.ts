import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
    @ApiProperty({
        example:'aaaaa',
        description:'jwt access token'
    })
    accessToken!: string;
}