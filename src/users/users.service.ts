import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Project } from 'src/projects/project.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createUserDto: CreateUsersDto): Promise<User> {
    try {
      const user = this.userRepository.create({
        ...createUserDto,
        project: { id: createUserDto.projectId },
      });
      return await this.userRepository.save(user);
    } catch (error) {
      this.handleDatabaseErrors(error);
    }
  }
  async findAll(paginationDto: PaginationDto): Promise<User[]> {
    const { limit = 4, offset = 0 } = paginationDto;

    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
    });

    return users.map((user) => ({
      ...user,
    }));
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['project'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUsersDto): Promise<User> {
    try {
      const user = await this.findOne(id);

      const existingUser = await this.userRepository.findOne({
        where: [
          { username: updateUserDto.username },
          { email: updateUserDto.email },
        ],
      });

      if (existingUser && existingUser.id !== id) {
        throw new HttpException(
          'Username or email already exists',
          HttpStatus.CONFLICT,
        );
      }

      if (updateUserDto.projectId) {
        const project = await this.projectRepository.findOne({
          where: { id: updateUserDto.projectId },
        });

        if (!project) {
          throw new NotFoundException('Project not found');
        }

        user.project = project;
      }

      Object.assign(user, updateUserDto);
      user.updatedAt = new Date();

      return await this.userRepository.save(user);
    } catch (error) {
      this.handleDatabaseErrors(error);
    }
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async removeAll() {
    const query = this.userRepository.createQueryBuilder('users');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDatabaseErrors(error);
    }
  }

  private handleDatabaseErrors(error: any): void {
    this.logger.error(error);

    if (error.code === '23505' || error.status === 409)
      throw new ConflictException('username or email already exists');

    throw new InternalServerErrorException('An unexpected error occurred');
  }
}
