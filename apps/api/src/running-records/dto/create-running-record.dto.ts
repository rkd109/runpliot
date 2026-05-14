import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRunningRecordDto {
    @IsDateString()
    @ApiProperty({
        example: '2026-05-14'
    })
    runDate!: string;

    @IsNumber()
    @ApiProperty({
        example: 5.2
    })
    distanceKm!: number;

    @IsInt()
    @ApiProperty({
        example:1800
    })
    durationSeconds!: number;

    @IsOptional()
    @IsString()
    @ApiProperty({
        example : '가볍게 조깅 완료',
        required: false
    })
    memo?: string;
}