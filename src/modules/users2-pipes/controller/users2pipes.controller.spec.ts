import { Test, TestingModule } from '@nestjs/testing';
import { Users2pipesController } from './users2pipes.controller';

describe('Users2pipesController', () => {
  let controller: Users2pipesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Users2pipesController],
    }).compile();

    controller = module.get<Users2pipesController>(Users2pipesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
