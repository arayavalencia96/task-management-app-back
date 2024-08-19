import { PartialType } from '@nestjs/swagger';
import { CreateTasksDto } from './create-tasks.dto';

export class UpdateTasksDto extends PartialType(CreateTasksDto) {}
