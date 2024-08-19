import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUsersDto = {
      name: 'test',
      username: 'testuser',
      email: 'test@test.com',
      projectId: '1',
    };
    const user = { id: '1', ...createUserDto };

    jest.spyOn(service, 'create').mockResolvedValue(user as any);

    const result = await controller.create(createUserDto);
    expect(result).toEqual(user);
  });

  it('should return an array of users', async () => {
    const users = [{ id: '1', username: 'testuser', email: 'test@test.com' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(users as any);

    const result = await controller.findAll({} as PaginationDto);
    expect(result).toEqual(users);
  });

  it('should return a user if found', async () => {
    const user = { id: '1', username: 'testuser', email: 'test@test.com' };
    jest.spyOn(service, 'findOne').mockResolvedValue(user as any);

    const result = await controller.findOne('1');
    expect(result).toEqual(user);
  });

  it('should throw a NotFoundException if user not found', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

    await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUsersDto = {
      username: 'updateduser',
      email: 'updated@test.com',
    };
    const user = { id: '1', ...updateUserDto };

    jest.spyOn(service, 'update').mockResolvedValue(user as any);

    const result = await controller.update('1', updateUserDto);
    expect(result).toEqual(user);
  });

  it('should remove a user', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
