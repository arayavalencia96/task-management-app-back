import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/project.entity';
import { Task } from 'src/tasks/task.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, Task])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
