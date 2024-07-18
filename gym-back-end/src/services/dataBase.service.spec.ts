import { Test, TestingModule } from '@nestjs/testing';
import { DataBase } from './dataBase.service';

describe('ServicesService', () => {
  let service: DataBase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataBase],
    }).compile();

    service = module.get<DataBase>(DataBase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
