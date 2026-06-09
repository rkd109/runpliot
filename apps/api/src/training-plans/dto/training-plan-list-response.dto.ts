import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../common/dto/paginated-response.dto';
import { TrainingPlanResponseDto } from './training-plan-response.dto';

export class TrainingPlanListResponseDto extends PaginatedResponseDto<TrainingPlanResponseDto> {
  @ApiProperty({
    type: TrainingPlanResponseDto,
    isArray: true,
  })
  declare items: TrainingPlanResponseDto[];
}
