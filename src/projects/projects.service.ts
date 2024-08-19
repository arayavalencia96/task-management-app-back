import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { UpdateProjectsDto } from './dto/update-projects.dto';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger('ProjectsService');

  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectsDto): Promise<Project> {
    try {
      const project = this.projectRepository.create(createProjectDto);
      return this.projectRepository.save(project);
    } catch (error) {
      this.handleDatabaseErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Project[]> {
    const { limit = 4, offset = 0 } = paginationDto;

    const projects = await this.projectRepository.find({
      take: limit,
      skip: offset,
    });

    return projects.map((project) => ({
      ...project,
    }));
  }

  async findOne(id: string) {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectsDto,
  ): Promise<Project> {
    try {
      const project = await this.projectRepository.preload({
        id,
        ...updateProjectDto,
      });
      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      project.updatedAt = new Date();
      return await this.projectRepository.save(project);
    } catch (error) {
      this.handleDatabaseErrors(error);
    }
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }

  async removeAll() {
    const query = this.projectRepository.createQueryBuilder('projects');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDatabaseErrors(error);
    }
  }

  private handleDatabaseErrors(error: any): void {
    this.logger.error(error);

    throw new InternalServerErrorException('An unexpected error occurred');
  }
}
