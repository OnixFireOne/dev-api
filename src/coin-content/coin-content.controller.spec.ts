import { Test, TestingModule } from '@nestjs/testing';
import { CoinContentController } from './coin-content.controller';

describe('CoinContentController', () => {
  let controller: CoinContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoinContentController],
    }).compile();

    controller = module.get<CoinContentController>(CoinContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
