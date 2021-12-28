import { Test, TestingModule } from '@nestjs/testing';
import { StationService } from '../services/station.service';

describe('StationService', () => {
  let service: StationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StationService],
    }).compile();

    service = module.get<StationService>(StationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
