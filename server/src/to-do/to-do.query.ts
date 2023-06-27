import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

export class ToDoQuery {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async getAllToDo(params: any) {
    const query = `
      select 
        td.* 
      from 
        to_do as td
      order by td.id ${params.order}
      limit ${params.skip},${params.take}
    `;
    const result = await this.dataSource.query(query);
    if (!result.length) return null;
    return result;
  }
}
