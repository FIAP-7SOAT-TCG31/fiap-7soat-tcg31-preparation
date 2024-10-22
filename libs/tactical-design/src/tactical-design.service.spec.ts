import { Test, TestingModule } from '@nestjs/testing';
import { TacticalDesignService } from './tactical-design.service';

describe('TacticalDesignService', () => {
  let service: TacticalDesignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TacticalDesignService],
    }).compile();

    service = module.get<TacticalDesignService>(TacticalDesignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
