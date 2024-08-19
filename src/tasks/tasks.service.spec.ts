import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Project } from 'src/projects/project.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

fdescribe('TasksService', () => {
  let service: TasksService;
  let taskRepository: Repository<Task>;
  let userRepository: Repository<User>;
  let projectRepository: Repository<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Project),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    projectRepository = module.get<Repository<Project>>(
      getRepositoryToken(Project),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and save a new task', async () => {
    const createTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
      projectId: 'project-id',
      userId: 'user-id',
      deadline: new Date(),
      createdAt: new Date(),
    };

    const savedTask: Partial<Task> = { id: 'task-id', ...createTaskDto };

    jest.spyOn(taskRepository, 'create').mockReturnValue(savedTask as Task);
    jest.spyOn(taskRepository, 'save').mockResolvedValue(savedTask as Task);

    expect(await service.create(createTaskDto)).toEqual(savedTask);
    expect(taskRepository.create).toHaveBeenCalledWith({
      ...createTaskDto,
      project: { id: createTaskDto.projectId },
      user: { id: createTaskDto.userId },
    });
    expect(taskRepository.save).toHaveBeenCalledWith(savedTask);
  });

  it('should return an array of tasks', async () => {
    const tasks = [{ id: 'task-id', title: 'Test Task' }];

    jest.spyOn(taskRepository, 'find').mockResolvedValue(tasks as Task[]);

    expect(await service.findAll({} as PaginationDto)).toEqual(tasks);
    expect(taskRepository.find).toHaveBeenCalled();
  });

  it('should return a task by ID', async () => {
    const task = { id: 'task-id', title: 'Test Task' };

    jest.spyOn(taskRepository, 'findOne').mockResolvedValue(task as Task);

    expect(await service.findOne('task-id')).toEqual(task);
    expect(taskRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'task-id' },
      relations: ['project', 'user'],
    });
  });

  it('should throw NotFoundException if task not found', async () => {
    jest.spyOn(taskRepository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne('nonexistent-id')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update a task', async () => {
    const updateTaskDto = {
      title: 'Updated Task',
      projectId: 'project-id',
      userId: 'user-id',
    };

    const existingTask = {
      id: 'task-id',
      title: 'Old Task',
      project: {},
      user: {},
    };

    const user = { id: 'user-id', name: 'Test User' };
    const project = { id: 'project-id', name: 'Test Project' };

    jest.spyOn(service, 'findOne').mockResolvedValue(existingTask as Task);
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as User);
    jest
      .spyOn(projectRepository, 'findOne')
      .mockResolvedValue(project as Project);
    jest.spyOn(taskRepository, 'save').mockResolvedValue(existingTask as Task);

    const updatedTask = await service.update('task-id', updateTaskDto);

    expect(updatedTask.title).toBe('Updated Task');
    expect(updatedTask.project).toEqual(project);
    expect(updatedTask.user).toEqual(user);
    expect(taskRepository.save).toHaveBeenCalledWith(existingTask);
  });

  it('should remove a task by ID', async () => {
    const task = { id: 'task-id', title: 'Test Task' };

    jest.spyOn(service, 'findOne').mockResolvedValue(task as Task);
    jest.spyOn(taskRepository, 'remove').mockResolvedValue(task as any);

    await service.remove('task-id');

    expect(taskRepository.remove).toHaveBeenCalledWith(task);
  });
});
