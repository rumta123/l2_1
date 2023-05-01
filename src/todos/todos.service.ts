import { Injectable } from '@nestjs/common';
import { Todo } from './todos.model';
import {InjectModel} from "@nestjs/sequelize";
import { createTodoDto } from './dto/create-todo';
@Injectable()
export class TodosService {    
    constructor (@InjectModel(Todo) private TodoRepresitory: typeof Todo){}

    async createTodo(dto:createTodoDto){

        const todo = await this.TodoRepresitory.create(dto);
        return todo;
    

    }
    async updateById(id: number, dto: createTodoDto): Promise<Todo> {
        const todo = await this.TodoRepresitory.findByPk(id);
        if (!todo) {
          throw new Error(`Todo with id "${id}" not found`);
        }
        await todo.update(dto);
        return todo;
      }
    async findById(id: number): Promise<Todo> {
        return await this.TodoRepresitory.findByPk(id);
      }

    async getAllTodos(){
        const todos = await this.TodoRepresitory.findAll();
        return todos;
    }
}
