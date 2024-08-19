import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Project])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
