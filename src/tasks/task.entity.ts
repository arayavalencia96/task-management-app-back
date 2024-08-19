import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/projects/project.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('tasks')
export class Task {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'Task ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Do homework',
    description: 'Title of the task',
    type: 'string',
  })
  @Column({ type: 'text' })
  title: string;

  @ApiProperty({
    description: 'Description of the task',
    type: 'string',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    example: '2024-08-11T00:00:00Z',
    description: 'Task creation',
    type: 'string',
    format: 'date-time',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    example: '2024-08-12T00:00:00Z',
    description: 'Task last update',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ApiProperty({
    example: '2024-08-15',
    description: 'Deadline for the task',
    type: 'string',
    format: 'date',
    required: false,
  })
  @Column({ type: 'date', nullable: true })
  deadline?: Date;

  @ApiProperty({
    example: false,
    description: 'Is completed?',
    type: 'boolean',
    default: false,
  })
  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @ApiProperty({
    description: 'User assigned to the task',
    type: () => User,
    required: false,
  })
  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  user: User;

  @ApiProperty({
    description: 'Project associated with the task',
    type: () => Project,
  })
  @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
  project: Project;
}
