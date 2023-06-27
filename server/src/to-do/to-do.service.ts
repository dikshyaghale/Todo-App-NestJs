import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ToDoEntity } from "./entity/to-do.entity";
import { ToDoQuery } from "./to-do.query";

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDoEntity)
    private toDoRepository: Repository<ToDoEntity>,
    private todoQuery: ToDoQuery
  ) {}

  create = async (body: ToDoEntity) => {
    return await this.toDoRepository.save(ToDoEntity.create({ ...body }));
  };

  findAll = async (params: any) => {
    return await this.todoQuery.getAllToDo(params);
  };

  findOne = async (id: number) => {
    return await this.toDoRepository.findOne({ where: { id: id } });
  };

  updateOne = async (id: number, body: ToDoEntity) => {
    body.id = id;
    await this.toDoRepository.save({ ...body });
    return await this.findOne(id);
  };

  deleteOne = async (id: number) => {
    const deletedItem = await this.toDoRepository.delete({ id });
    return deletedItem.affected >= 1;
  };
}
