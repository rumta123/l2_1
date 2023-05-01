import {Model, Table} from 'sequelize-typescript';
import {BelongsToMany, Column, DataType, HasMany} from "sequelize-typescript";
// объекты
interface createAttr{

    id:number;
    title:string;

    description:string;
}
@Table({tableName:'todo'})

export class Todo extends Model<Todo, createAttr>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    title:string;
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    description:string;
    @Column({type: DataType.BOOLEAN, unique: false, allowNull: true})
    isDone :boolean;

}
   


