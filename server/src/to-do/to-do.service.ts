import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ToDoEntity } from "./entity/to-do.entity";

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDoEntity) private toDoRepository: Repository<ToDoEntity>
  ) {}

  create = async (body: ToDoEntity) => {
    return await this.toDoRepository.save(ToDoEntity.create({ ...body }));
  };

  findAll = async (params: any) => {
    return await this.toDoRepository.find();
  };
}
