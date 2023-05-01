import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodosModule } from './todos/todos.module';
import { ConfigModule } from '@nestjs/config';
import {Todo} from './todos/todos.model';
@Module({

  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env'
    }),
     SequelizeModule.forRoot({
      dialect:'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'tododb',
      // synchronize: true,
      models:[Todo],
      autoLoadModels:true,

    }),
     TodosModule,
  ],
})
export class AppModule {}
