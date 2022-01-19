import { Test, TestingModule } from '@nestjs/testing';
import { OutageController } from './outage.controller';
import { OutageService } from './outage.service';

describe('OutageController', () => {
  let controller: OutageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutageController],
      providers: [OutageService],
    }).compile();

    controller = module.get<OutageController>(OutageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
