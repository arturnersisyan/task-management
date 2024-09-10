import { timeStamp } from 'console';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type PriorityType = 'Low' | 'Medium' | 'High';
export type StatusType = 'Pending' | 'In Progress' | 'Completed';

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
    default: 'Pending'
  })
  status: StatusType;

  @Column()
  assigned_member: string // ManyToOne User model

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
