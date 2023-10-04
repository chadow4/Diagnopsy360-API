import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentController } from './treatment.controller';

describe('TreatmentController', () => {
  let controller: TreatmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentController],
    }).compile();

    controller = module.get<TreatmentController>(TreatmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
