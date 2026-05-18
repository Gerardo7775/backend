import { Test, TestingModule } from '@nestjs/testing';
import { AgenciasService } from './agencias.service';

describe('AgenciasService', () => {
  let service: AgenciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgenciasService],
    }).compile();

    service = module.get<AgenciasService>(AgenciasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
