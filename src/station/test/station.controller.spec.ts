import { Test, TestingModule } from '@nestjs/testing';
import { StationController } from '../controllers/station.controller';
import { StationService } from '../services/station.service';

describe('StationController', () => {
  let controller: StationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StationController],
      providers: [StationService],
    }).compile();

    controller = module.get<StationController>(StationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
