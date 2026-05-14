import { Test, TestingModule } from '@nestjs/testing';
import { RunningRecordsController } from './running-records.controller';

describe('RunningRecordsController', () => {
  let controller: RunningRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunningRecordsController],
    }).compile();

    controller = module.get<RunningRecordsController>(RunningRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
