import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './model/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { reduce } from 'rxjs';

describe('TaskService', () => {
  let service: AppService;
  let taskRepository: Repository<Task>;

  const mockTasks = [
    {
      id: '1',
      title: 'First title',
      description: 'Fist desc',
      dueDate: new Date('2024-09-13'),
      priority: 'Medium',
      assignedMember: 'Member',
      status: 'Completed',
      createdAt: new Date('2024-09-09'),
      updatedAt: new Date('2024-09-12'),
    },
    {
      id: '2',
      title: 'Second title',
      description: 'Second desc',
      dueDate: new Date('2024-09-13'),
      priority: 'High',
      assignedMember: 'Member',
      status: 'Completed',
      createdAt: new Date('2024-09-07'),
      updatedAt: new Date('2024-09-12'),
    },
  ];

  const task = new Task();
  Object.assign(task, mockTasks);

  const TASK_REPOSITORY_TOKEN = getRepositoryToken(Task);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: TASK_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            reduce: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    taskRepository = module.get<Repository<Task>>(TASK_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('taskRepository should be defined', () => {
    expect(taskRepository).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const newTask: CreateTaskDto = {
        title: 'Second',
        description: 'Tester',
        dueDate: new Date('2024-09-12'),
        priority: 'High',
        assignedMember: 'Er',
      };
      const result = await service.createTask(newTask);

      expect(result).toEqual(taskRepository.create(newTask));
    });
  });

  describe('updateStatus', () => {
    it('shoult return yes', async () => {
      const replacedTask = {
        id: '1',
        title: 'Second',
        description: 'Tester',
        dueDate: new Date('2024-09-12'),
        priority: 'Medium',
        assignedMember: 'Er',
      };
      const updateTaskStatus: UpdateTaskDto = {
        status: 'Completed',
      };

      const result = await service.updateTaskStatus(
        replacedTask.id,
        updateTaskStatus,
      );
      expect(result).toEqual({ isUpdated: 'Yes' });
    });
  });

  describe('findById', () => {
    it('Should find task information', async () => {
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(task[0]);
      const result = await service.getTaskById(mockTasks[0].id);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockTasks[0].id },
      });
      expect(result).toEqual(mockTasks[0]);
    });
  });

  describe('getReportByMember', () => {
    it('should return the completed tasks and average completion time', async () => {
      (taskRepository.find as jest.Mock).mockResolvedValue(mockTasks);

      const result = await service.generateReportByMemberName('Member');

      // Check if the correct values are calculated
      expect(result).toEqual({
        completedTasks: 2,
        avgTimeToCompleteTasksInMin: 5760,
      });
    });

    it('should return 0 for completed tasks and average time if no tasks are found', async () => {
      // Mock repository's find method to return an empty array
      (taskRepository.find as jest.Mock).mockResolvedValue([]);

      const result = await service.generateReportByMemberName('Member');

      // Check if the result is correct when there are no completed tasks
      expect(result.completedTasks).toEqual(0);
    });
  });
});
