import { Test, TestingModule } from '@nestjs/testing';
import { AreaOfficeService } from './area-office.service';

describe('AreaOfficeService', () => {
  let service: AreaOfficeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreaOfficeService],
    }).compile();

    service = module.get<AreaOfficeService>(AreaOfficeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
