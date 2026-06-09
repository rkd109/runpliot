import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../common/dto/paginated-response.dto';
import { RunningRecordResponseDto } from './running-record-response.dto';

export class RunningRecordListResponseDto extends PaginatedResponseDto<RunningRecordResponseDto> {
  @ApiProperty({
    type: RunningRecordResponseDto,
    isArray: true,
  })
  declare items: RunningRecordResponseDto[];
}
