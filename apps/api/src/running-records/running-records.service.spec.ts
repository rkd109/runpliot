import { Test, TestingModule } from '@nestjs/testing';
import { RunningRecordsService } from './running-records.service';

describe('RunningRecordsService', () => {
  let service: RunningRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunningRecordsService],
    }).compile();

    service = module.get<RunningRecordsService>(RunningRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
