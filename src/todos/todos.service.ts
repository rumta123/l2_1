import { Injectable } from '@nestjs/common';
import { Todo } from './todos.model';
import {InjectModel} from "@nestjs/sequelize";
import { createTodoDto } from './dto/create-todo';
@Injectable()
export class TodosService {    
    constructor (@InjectModel(Todo) private TodoRepresitory: typeof Todo){}

    async createTodo(dto: createTodoDto): Promise<Todo> {
        const todo = await this.TodoRepresitory.create(dto);
        todo.id = todo.id || todo.getDataValue('id');
        return todo.toJSON() as Todo;
      }
    async updateById(id: string, dto: createTodoDto): Promise<Todo> {
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

    async deleteById(id: string): Promise<void> {
        const todo = await this.TodoRepresitory.findByPk(id);
        if (!todo) {
            throw new Error(`Todo with id "${id}" not found`);
        }
        await todo.destroy();
    }

    async deleteAll(): Promise<void> {
        await this.TodoRepresitory.destroy({ where: {} });
    }
}
