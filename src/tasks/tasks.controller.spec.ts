import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { Task } from './task.entity';
import { UpdateTasksDto } from './dto/update-tasks.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

fdescribe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
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

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new task', async () => {
    const createTaskDto: CreateTasksDto = {
      title: 'Test Task',
      description: 'Test Description',
      projectId: 'project-id',
      userId: 'user-id',
      deadline: new Date('2024-08-15T10:30:00Z'),
    };

    const createdTask: Partial<Task> = {
      id: 'task-id',
      ...createTaskDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      isCompleted: false,
    };

    jest.spyOn(service, 'create').mockResolvedValue(createdTask as Task);

    expect(await controller.create(createTaskDto)).toEqual(createdTask);
    expect(service.create).toHaveBeenCalledWith(createTaskDto);
  });

  it('should return an array of tasks', async () => {
    const tasks: Partial<Task>[] = [
      {
        id: 'task-id-1',
        title: 'Task 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        isCompleted: false,
      },
      {
        id: 'task-id-2',
        title: 'Task 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        isCompleted: true,
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(tasks as Task[]);

    expect(await controller.findAll({} as PaginationDto)).toEqual(tasks);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single task', async () => {
    const task: Partial<Task> = {
      id: 'task-id',
      title: 'Task 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      isCompleted: false,
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(task as Task);

    expect(await controller.findOne('task-id')).toEqual(task);
    expect(service.findOne).toHaveBeenCalledWith('task-id');
  });

  it('should update and return the updated task', async () => {
    const updateTaskDto: UpdateTasksDto = {
      title: 'Updated Task',
      projectId: 'updated-project-id',
      userId: 'updated-user-id',
    };

    const updatedTask: Partial<Task> = {
      id: 'task-id',
      ...updateTaskDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      isCompleted: false,
    };

    jest.spyOn(service, 'update').mockResolvedValue(updatedTask as Task);

    expect(await controller.update('task-id', updateTaskDto)).toEqual(
      updatedTask,
    );
    expect(service.update).toHaveBeenCalledWith('task-id', updateTaskDto);
  });

  it('should remove the task', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue();

    await controller.remove('task-id');
    expect(service.remove).toHaveBeenCalledWith('task-id');
  });
});
