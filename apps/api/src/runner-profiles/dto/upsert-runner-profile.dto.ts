import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsDateString,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

const EXPERIENCE_LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const;
const TRAINING_DAYS = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;

export class UpsertRunnerProfileDto {
  @IsIn(EXPERIENCE_LEVELS)
  @ApiProperty({
    enum: EXPERIENCE_LEVELS,
    example: 'BEGINNER',
  })
  experienceLevel!: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(14)
  @ApiProperty({
    example: 3,
    minimum: 0,
    maximum: 14,
  })
  weeklyRunCount!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.1)
  @Max(100)
  @ApiProperty({
    example: 5,
    minimum: 0.1,
    maximum: 100,
  })
  comfortableDistanceKm!: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiPropertyOptional({
    example: '10km 완주',
  })
  goal?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: '2026-06-15',
  })
  planStartDate?: string;

  @IsArray()
  @ArrayUnique()
  @IsIn(TRAINING_DAYS, { each: true })
  @ApiProperty({
    enum: TRAINING_DAYS,
    isArray: true,
    example: ['MONDAY', 'WEDNESDAY', 'SATURDAY'],
  })
  preferredTrainingDays!: string[];
}
