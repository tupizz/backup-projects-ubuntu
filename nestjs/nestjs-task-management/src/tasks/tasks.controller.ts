import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  // @Post()
  // createNewTask(@Body() body) {
  //   return this.tasksService.createTask(body.title, body.description);
  // }

  // @Post()
  // createNewTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ) {
  //   return this.tasksService.createTask(title, description);
  // }

  @Post()
  createNewTask(@Body() createTaskDTO: CreateTaskDTO) {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string) {}
}
