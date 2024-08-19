import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Project } from 'src/projects/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, Project])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
