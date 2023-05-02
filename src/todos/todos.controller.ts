import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { createTodoDto } from './dto/create-todo';
import { TodosService } from './todos.service';
import { Todo } from './todos.model';
@Controller('todos')
export class TodosController {

    constructor (private todosService: TodosService){}
    @Post()
    create (@Body() tododto : createTodoDto){
        return this.todosService.createTodo(tododto)
    }
    
    @Get()
    async getAll(): Promise<Todo[]> {
        return await this.todosService.getAllTodos();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Todo> {
        try {
          const todo = await this.todosService.findById(id);
          if (!todo) {
            throw new Error(`Todo with id "${id}" not found`);
          }
          return todo;
        } catch (error) {
          throw new Error(`Unable to find todo with id "${id}": ${error.message}`);
        }
      }
    
    @Patch(':id')
    async updateById(@Param('id') id: string, @Body() updateTodoDto: createTodoDto): Promise<Todo> {
        return await this.todosService.updateById(id, updateTodoDto);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string): Promise<void> {
        return await this.todosService.deleteById(id);
    }

    @Delete()
    async deleteAll(): Promise<void> {
        return await this.todosService.deleteAll();
    }

}
