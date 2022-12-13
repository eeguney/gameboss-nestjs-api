import { Test, TestingModule } from '@nestjs/testing';
import { TournamentCategoryService } from './tournament-category.service';

describe('TournamentCategoryService', () => {
  let service: TournamentCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournamentCategoryService],
    }).compile();

    service = module.get<TournamentCategoryService>(TournamentCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
