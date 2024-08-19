import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTasksDto {
  @ApiProperty({
    example: 'Do homework',
    description: 'Title of the task',
    type: 'string',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the task',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '2024-08-15',
    description: 'Deadline for the task',
    type: 'string',
    format: 'date',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  deadline?: Date;

  @ApiProperty({
    example: false,
    description: 'Is completed?',
    type: 'boolean',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'ID of the user assigned to the task',
    type: 'string',
    format: 'uuid',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'ID of the project associated with the task',
    type: 'string',
    format: 'uuid',
  })
  @IsUUID()
  projectId: string;
}
