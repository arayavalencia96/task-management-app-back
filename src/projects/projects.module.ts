import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, Task])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
