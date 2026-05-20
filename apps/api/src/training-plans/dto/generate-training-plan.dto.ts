import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GenerateTrainingPlanDto {
    @ApiPropertyOptional({
        example : '10km 완주 준비'
    })
    @IsOptional()
    @IsString()
    goal?: string;
}