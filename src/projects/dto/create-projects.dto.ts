import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProjectsDto {
  @ApiProperty({
    description: 'Name of the project',
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the project',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'ID of the user who created the project',
    type: 'string',
    format: 'uuid',
  })
  @IsUUID()
  createdBy: string;
}
