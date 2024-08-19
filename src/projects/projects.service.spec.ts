import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateProjectsDto } from './dto/update-projects.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProjectsDto } from './dto/create-projects.dto';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let projectRepository: Repository<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    projectRepository = module.get<Repository<Project>>(
      getRepositoryToken(Project),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and save a new project', async () => {
    const createProjectDto: CreateProjectsDto = {
      name: 'New Project',
      description: 'Project Description',
      createdBy: 'id',
    };

    const savedProject = {
      id: 'project-id',
      ...createProjectDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(projectRepository, 'create')
      .mockReturnValue(savedProject as Project);
    jest
      .spyOn(projectRepository, 'save')
      .mockResolvedValue(savedProject as Project);

    expect(await service.create(createProjectDto)).toEqual(savedProject);
    expect(projectRepository.create).toHaveBeenCalledWith(createProjectDto);
    expect(projectRepository.save).toHaveBeenCalledWith(savedProject);
  });

  it('should return an array of projects', async () => {
    const projects = [
      {
        id: 'project-id-1',
        name: 'Project 1',
        description: 'Description 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'project-id-2',
        name: 'Project 2',
        description: 'Description 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest
      .spyOn(projectRepository, 'find')
      .mockResolvedValue(projects as Project[]);

    expect(await service.findAll({} as PaginationDto)).toEqual(projects);
    expect(projectRepository.find).toHaveBeenCalled();
  });

  it('should return a project if it exists', async () => {
    const project = {
      id: 'project-id',
      name: 'Project 1',
      description: 'Description 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(projectRepository, 'findOne')
      .mockResolvedValue(project as Project);

    expect(await service.findOne('project-id')).toEqual(project);
    expect(projectRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'project-id' },
    });
  });

  it('should update and return the updated project', async () => {
    const updateProjectDto: UpdateProjectsDto = {
      name: 'Updated Project',
      description: 'Updated Description',
    };

    const updatedProject = {
      id: 'project-id',
      ...updateProjectDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(projectRepository, 'preload')
      .mockResolvedValue(updatedProject as Project);
    jest
      .spyOn(projectRepository, 'save')
      .mockResolvedValue(updatedProject as Project);

    expect(await service.update('project-id', updateProjectDto)).toEqual(
      updatedProject,
    );
    expect(projectRepository.preload).toHaveBeenCalledWith({
      id: 'project-id',
      ...updateProjectDto,
    });
    expect(projectRepository.save).toHaveBeenCalledWith(updatedProject);
  });

  it('should remove a project', async () => {
    const project = {
      id: 'project-id',
      name: 'Project 1',
      description: 'Description 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(project as Project);
    jest
      .spyOn(projectRepository, 'remove')
      .mockResolvedValue(project as Project);

    await service.remove('project-id');
    expect(service.findOne).toHaveBeenCalledWith('project-id');
    expect(projectRepository.remove).toHaveBeenCalledWith(project);
  });
});
