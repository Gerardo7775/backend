import { Test, TestingModule } from '@nestjs/testing';
import { AgenciasController } from './agencias.controller';

describe('AgenciasController', () => {
  let controller: AgenciasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgenciasController],
    }).compile();

    controller = module.get<AgenciasController>(AgenciasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
