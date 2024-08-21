import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Task } from 'src/tasks/task.entity';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    await this.insertNewData();

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.deleteAllTasks();
    await this.deleteAllUsers();
    await this.deleteAllProjects();
  }

  private async deleteAllTasks() {
    const queryBuilder = this.taskRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async deleteAllUsers() {
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async deleteAllProjects() {
    const queryBuilder = this.projectRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertNewData() {
    const { projects, users, tasks } = initialData;

    const insertedProjects = await this.projectRepository.save(projects);

    users.forEach((user, index) => {
      user.project = insertedProjects[Math.floor(index / 2)];
    });
    const insertedUsers = await this.userRepository.save(users);

    tasks.forEach((task, index) => {
      task.project = insertedProjects[Math.floor(index / 5)];
      task.user = insertedUsers[index % insertedUsers.length];
    });
    await this.taskRepository.save(tasks);
  }
}
