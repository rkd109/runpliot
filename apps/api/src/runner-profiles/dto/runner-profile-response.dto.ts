import { ApiProperty } from '@nestjs/swagger';

export class RunnerProfileResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  experienceLevel!: string;

  @ApiProperty()
  weeklyRunCount!: number;

  @ApiProperty()
  comfortableDistanceKm!: number;

  @ApiProperty({
    nullable: true,
  })
  goal!: string | null;

  @ApiProperty({
    nullable: true,
  })
  planStartDate!: Date | null;

  @ApiProperty({
    isArray: true,
    type: String,
  })
  preferredTrainingDays!: string[];

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
