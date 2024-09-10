import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './model/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { title } from 'process';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskData: CreateTaskDto): Promise<CreateTaskDto> {
    const task = this.taskRepository.create(createTaskData);
    try {
      await this.taskRepository.save(task);
    } catch (err) {
      throw new BadRequestException(err.message , {
        cause: new Error(),
        description: 'Task failed',
      });
    }
    return {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      assignedMember: task.assignedMember,
    };
  }

  async updateTaskStatus(
    id: string,
    updateTaskData: UpdateTaskDto,
  ): Promise<any> {
    try {
      await this.taskRepository.save({ ...updateTaskData, id });
    } catch (err) {
      throw new BadRequestException(err.message , {
        cause: new Error(),
        description: 'Task failed',
      });
    }
    return { isUpdated: 'Yes' };
  }

  async getTaskById(id: string): Promise<any> {
    let taskDetails;
    try {
      taskDetails = await this.taskRepository.findOne({ where: { id } });
    } catch (err) {
      throw new BadRequestException(err.message, {
        cause: new Error(),
        description: 'Task failed',
      });
    }

    return {
      title: taskDetails.title,
      description: taskDetails.description,
      dueDate: taskDetails.dueDate,
      priority: taskDetails.priority,
      assignedMember: taskDetails.assignedMember,
      status: taskDetails.status,
    };
  }

  async generateReportByMemberName(memberName: string): Promise<any> {
    let completedTasks = [];
    try {
      completedTasks = await this.taskRepository.find({
        where: { assignedMember: memberName, status: 'Completed' },
      });
    } catch (err) {
      throw new BadRequestException(err.message, {
        cause: new Error(),
        description: 'Task failed',
      });
    }

    const avgTime = completedTasks.reduce((acc, task) => {
      return (
        acc +
        (new Date(task.updatedAt).getTime() -
          new Date(task.createdAt).getTime())
      );
    }, 0) / completedTasks.length;

    console.log(avgTime);
    return {
      completedTasks: completedTasks.length,
      avgTimeToCompleteTasksInMin: avgTime / (1000 * 60),
    };
  }
}
