import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Task API')
@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async createTask(@Body() createTaskData: CreateTaskDto) {
    return this.appService.createTask(createTaskData);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/status/:id')
  async updateTaskStatus(@Param('id') id: string, @Body() upadeTaskData: UpdateTaskDto) {
    return this.appService.updateTaskStatus(id, upadeTaskData)
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTaskById(@Param('id') id: string){
    return this.appService.getTaskById(id)
  }

  @HttpCode(HttpStatus.OK)
  @Get('report/member/:memberName')
  async generateReportByMemberName(@Param('memberName') memberName: string){
    return this.appService.generateReportByMemberName(memberName)
  }
} 
