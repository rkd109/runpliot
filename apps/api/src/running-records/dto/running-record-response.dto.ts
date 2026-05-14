import { ApiProperty } from "@nestjs/swagger";

export class RunningRecordResponseDto {
    @ApiProperty()
    id!: number;

    @ApiProperty()
    runDate!: Date;

    @ApiProperty()
    distanceKm!: number;

    @ApiProperty()
    durationSeconds!: number;

    @ApiProperty()
    memo?: string | null;

    @ApiProperty()
    createAt!: Date;

    @ApiProperty()
    updateAt!: Date;
}