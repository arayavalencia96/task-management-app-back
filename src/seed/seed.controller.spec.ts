import { Test, TestingModule } from '@nestjs/testing';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

describe('SeedController', () => {
  let controller: SeedController;
  let seedService: SeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeedController],
      providers: [
        {
          provide: SeedService,
          useValue: {
            runSeed: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SeedController>(SeedController);
    seedService = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call runSeed from SeedService and return result', async () => {
    const expectedResult = 'SEED EXECUTED';
    jest.spyOn(seedService, 'runSeed').mockResolvedValue(expectedResult);

    const result = await controller.executeSeed();

    expect(result).toBe(expectedResult);
    expect(seedService.runSeed).toHaveBeenCalled();
  });
});
