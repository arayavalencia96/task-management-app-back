import { Test, TestingModule } from '@nestjs/testing';
import { SeedService } from './seed.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from 'src/projects/project.entity';
import { User } from 'src/users/user.entity';
import { Task } from 'src/tasks/task.entity';
import { Repository } from 'typeorm';

describe('SeedService', () => {
  let service: SeedService;
  let projectRepository: jest.Mocked<Repository<Project>>;
  let userRepository: jest.Mocked<Repository<User>>;
  let taskRepository: jest.Mocked<Repository<Task>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        {
          provide: getRepositoryToken(Project),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
    projectRepository = module.get(getRepositoryToken(Project));
    userRepository = module.get(getRepositoryToken(User));
    taskRepository = module.get(getRepositoryToken(Task));

    // Mocking createQueryBuilder for all repositories
    const mockQueryBuilder = {
      delete: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn(),
    };

    jest
      .spyOn(taskRepository, 'createQueryBuilder')
      .mockReturnValue(mockQueryBuilder as any);
    jest
      .spyOn(userRepository, 'createQueryBuilder')
      .mockReturnValue(mockQueryBuilder as any);
    jest
      .spyOn(projectRepository, 'createQueryBuilder')
      .mockReturnValue(mockQueryBuilder as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete all tasks, users, and projects', async () => {
    // Mocking save method
    const mockProjects = [{ id: 1, name: 'Project 1' }];
    const mockUsers = [{ id: 1, name: 'User 1', project: mockProjects[0] }];
    const mockTasks = [
      { id: 1, name: 'Task 1', project: mockProjects[0], user: mockUsers[0] },
    ];

    jest
      .spyOn(projectRepository, 'save')
      .mockResolvedValue(mockProjects as any);
    jest.spyOn(userRepository, 'save').mockResolvedValue(mockUsers as any);
    jest.spyOn(taskRepository, 'save').mockResolvedValue(mockTasks as any);
    await service.runSeed();

    expect(taskRepository.createQueryBuilder().delete).toHaveBeenCalled();
    expect(userRepository.createQueryBuilder().delete).toHaveBeenCalled();
    expect(projectRepository.createQueryBuilder().delete).toHaveBeenCalled();
  });

  it('should insert new data', async () => {
    // Mocking save method
    const mockProjects = [{ id: 1, name: 'Project 1' }];
    const mockUsers = [{ id: 1, name: 'User 1', project: mockProjects[0] }];
    const mockTasks = [
      { id: 1, name: 'Task 1', project: mockProjects[0], user: mockUsers[0] },
    ];

    jest
      .spyOn(projectRepository, 'save')
      .mockResolvedValue(mockProjects as any);
    jest.spyOn(userRepository, 'save').mockResolvedValue(mockUsers as any);
    jest.spyOn(taskRepository, 'save').mockResolvedValue(mockTasks as any);

    await service.runSeed();

    expect(projectRepository.save).toHaveBeenCalledWith(expect.any(Array));
    expect(userRepository.save).toHaveBeenCalledWith(expect.any(Array));
    expect(taskRepository.save).toHaveBeenCalledWith(expect.any(Array));
  });
});
