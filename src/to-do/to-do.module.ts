import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiKeyModule } from "src/api-key/api-key.module";
import { ToDoEntity } from "./entity/to-do.entity";
import { TodoController } from "./to-do.controller";
import { ToDoQuery } from "./to-do.query";
import { ToDoService } from "./to-do.service";

@Module({
  imports: [TypeOrmModule.forFeature([ToDoEntity]), ApiKeyModule],
  providers: [ToDoService, ToDoQuery],
  controllers: [TodoController],
  exports: [ToDoService],
})
export class ToDoModule {}
