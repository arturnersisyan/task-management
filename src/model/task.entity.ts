import { PriorityType, StatusType } from 'src/types/taskColumnTypes';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamptz' })
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: ['Low', 'Medium', 'High'],
  })
  priority: PriorityType;

  @Column({
    type: 'enum',
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  })
  status: StatusType;

  @Column()
  assignedMember: string; // ManyToOne User model

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
