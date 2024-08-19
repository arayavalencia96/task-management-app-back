import { Project } from 'src/projects/project.entity';
import { Task } from 'src/tasks/task.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'User ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Axel',
    description: 'The name of the user',
    type: 'string',
  })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    example: 'axelaraya',
    description: 'Unique username of the user',
    uniqueItems: true,
  })
  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @ApiProperty({
    example: 'axelaraya@gmail.com',
    description: 'Unique email of the user',
    uniqueItems: true,
  })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiProperty({
    description: 'Password for user authentication',
    type: 'string',
    default: null,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  password?: string;

  @ApiProperty({
    description: 'The project to which the user belongs',
    type: () => Project,
  })
  @ManyToOne(() => Project, (project) => project.users, { onDelete: 'CASCADE' })
  project: Project;

  @ApiProperty({
    example: '2023-08-11T10:15:30Z',
    description: 'Date when the user was created',
    type: 'string',
    format: 'date-time',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the user was last updated',
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @ApiProperty({
    description: 'Tasks assigned to the user',
    type: () => [Task],
  })
  @OneToMany(() => Task, (task) => task.user)
  tasks?: Task[];
}
