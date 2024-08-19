import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { UpdateTasksDto } from './dto/update-tasks.dto';
import { User } from 'src/users/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Project } from 'src/projects/project.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger('TasksService');

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createTaskDto: CreateTasksDto): Promise<Task> {
    try {
      const task = this.taskRepository.create({
        ...createTaskDto,
        project: { id: createTaskDto.projectId },
        user: { id: createTaskDto.userId },
      });
      return this.taskRepository.save(task);
    } catch (error) {
      this.handleDatabaseErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Task[]> {
    const { limit = 4, offset = 0 } = paginationDto;
    const tasks = await this.taskRepository.find({
      take: limit,
      skip: offset,
    });

    return tasks.map((user) => ({
      ...user,
    }));
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['project', 'user'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTasksDto): Promise<Task> {
    try {
      const task = await this.findOne(id);

      if (updateTaskDto.projectId && updateTaskDto.userId) {
        task.project = await this.projectRepository.findOne({
          where: { id: updateTaskDto.projectId },
        });

        const user = await this.userRepository.findOne({
          where: { id: updateTaskDto.userId },
        });
        if (!user) {
          throw new NotFoundException(
            `User with ID ${updateTaskDto.userId} not found`,
          );
        }

        task.user = user;
      }

      Object.assign(task, updateTaskDto);

      task.updatedAt = new Date();

      return this.taskRepository.save(task);
    } catch (error) {
      this.handleDatabaseErrors(error);
    }
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }

  async removeAll() {
    const query = this.taskRepository.createQueryBuilder('tasks');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDatabaseErrors(error);
    }
  }

  private handleDatabaseErrors(error: any): Promise<void> {
    this.logger.error(error);

    throw new InternalServerErrorException('An unexpected error occurred');
  }
}
