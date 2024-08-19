import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { UpdateProjectsDto } from './dto/update-projects.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
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

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create with correct DTO and return the created project', async () => {
    const createProjectDto: CreateProjectsDto = {
      name: 'New Project',
      description: 'Project Description',
      createdBy: 'id',
    };

    const createdProject = {
      id: 'project-id',
      ...createProjectDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Project;

    jest.spyOn(service, 'create').mockResolvedValue(createdProject);

    expect(await controller.create(createProjectDto)).toEqual(createdProject);
    expect(service.create).toHaveBeenCalledWith(createProjectDto);
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
    ] as Project[];

    jest.spyOn(service, 'findAll').mockResolvedValue(projects);

    expect(await controller.findAll({} as PaginationDto)).toEqual(projects);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a project if it exists', async () => {
    const project = {
      id: 'project-id',
      name: 'Project 1',
      description: 'Description 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Project;

    jest.spyOn(service, 'findOne').mockResolvedValue(project);

    expect(await controller.findOne('project-id')).toEqual(project);
    expect(service.findOne).toHaveBeenCalledWith('project-id');
  });

  it('should call service.update with correct ID and DTO and return the updated project', async () => {
    const updateProjectDto: UpdateProjectsDto = {
      name: 'Updated Project',
      description: 'Updated Description',
    };

    const updatedProject = {
      id: 'project-id',
      ...updateProjectDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Project;

    jest.spyOn(service, 'update').mockResolvedValue(updatedProject);

    expect(await controller.update('project-id', updateProjectDto)).toEqual(
      updatedProject,
    );
    expect(service.update).toHaveBeenCalledWith('project-id', updateProjectDto);
  });

  it('should call service.remove with correct ID', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove('project-id')).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith('project-id');
  });
});
