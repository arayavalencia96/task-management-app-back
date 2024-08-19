import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({
    example: 'Axel',
    description: 'Name of the user',
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'axelaraya',
    description: 'Username of the user',
    type: 'string',
    uniqueItems: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'axelaraya@gmail.com',
    description: 'Email of the user',
    type: 'string',
    uniqueItems: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'ID of the project the user is associated with',
    type: 'string',
    format: 'uuid',
  })
  @IsUUID()
  projectId: string;
}
