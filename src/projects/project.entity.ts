import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/tasks/task.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('projects')
export class Project {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'Project ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Name of the project',
    type: 'string',
  })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    description: 'Description of the project',
    type: 'string',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    example: '2024-08-11T00:00:00Z',
    description: 'Project creation',
    type: 'string',
    format: 'date-time',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    example: '2024-08-12T00:00:00Z',
    description: 'Project last update',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'ID of the user who created the project',
    type: 'string',
    format: 'uuid',
  })
  @Column({ type: 'uuid' })
  createdBy: string;

  @ApiProperty({
    description: 'Tasks associated with the project',
    type: () => [Task],
    required: false,
  })
  @OneToMany(() => Task, (task) => task.project, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  tasks?: Task[];

  @ApiProperty({
    description: 'Users associated with the project',
    type: () => [User],
    required: false,
  })
  @OneToMany(() => User, (user) => user.project, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  users?: User[];
}
