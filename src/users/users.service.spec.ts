import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Project } from 'src/projects/project.entity';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let projectRepository: Repository<Project>;

  const mockUserRepository = () => ({
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  });

  const mockProjectRepository = () => ({
    findOne: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository() },
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    projectRepository = module.get<Repository<Project>>(
      getRepositoryToken(Project),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUsersDto = {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      projectId: '123',
    };
    const user = new User();
    user.id = '1';
    user.name = 'John Doe';
    user.username = 'johndoe';
    user.email = 'john@example.com';
    user.project = { id: '123' } as any;

    jest.spyOn(userRepository, 'create').mockReturnValue(user);
    jest.spyOn(userRepository, 'save').mockResolvedValue(user);

    expect(await service.create(createUserDto)).toEqual(user);
  });

  it('should return a user by id', async () => {
    const user = new User();
    user.id = '1';
    user.name = 'John Doe';
    user.username = 'johndoe';
    user.email = 'john@example.com';

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

    expect(await service.findOne('1')).toEqual(user);
  });

  it('should throw an error if user not found', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUsersDto = {
      name: 'Jane Doe',
      projectId: '123',
    };
    const user = new User();
    user.id = '1';
    user.name = 'John Doe';
    user.username = 'johndoe';
    user.email = 'john@example.com';
    user.project = { id: '123' } as any;

    const updatedUser = { ...user, ...updateUserDto };
    jest.spyOn(service, 'findOne').mockResolvedValue(user);
    jest.spyOn(projectRepository, 'findOne').mockResolvedValue(user.project);
    jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser);

    expect(await service.update('1', updateUserDto)).toEqual(updatedUser);
  });

  it('should remove a user', async () => {
    const user = new User();
    user.id = '1';
    user.name = 'John Doe';
    user.username = 'johndoe';
    user.email = 'john@example.com';

    jest.spyOn(service, 'findOne').mockResolvedValue(user);
    jest.spyOn(userRepository, 'remove').mockResolvedValue(user);

    await expect(service.remove('1')).resolves.not.toThrow();
  });
});
