import { Test, TestingModule } from '@nestjs/testing';
import { OutageService } from './outage.service';

describe('OutageService', () => {
  let service: OutageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutageService],
    }).compile();

    service = module.get<OutageService>(OutageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
