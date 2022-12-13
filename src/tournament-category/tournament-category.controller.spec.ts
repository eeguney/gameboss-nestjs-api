import { Test, TestingModule } from '@nestjs/testing';
import { TournamentCategoryController } from './tournament-category.controller';
import { TournamentCategoryService } from './tournament-category.service';

describe('TournamentCategoryController', () => {
  let controller: TournamentCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentCategoryController],
      providers: [TournamentCategoryService],
    }).compile();

    controller = module.get<TournamentCategoryController>(TournamentCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
