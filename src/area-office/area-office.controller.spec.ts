import { Test, TestingModule } from '@nestjs/testing';
import { AreaOfficeController } from './area-office.controller';
import { AreaOfficeService } from './area-office.service';

describe('AreaOfficeController', () => {
  let controller: AreaOfficeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreaOfficeController],
      providers: [AreaOfficeService],
    }).compile();

    controller = module.get<AreaOfficeController>(AreaOfficeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
