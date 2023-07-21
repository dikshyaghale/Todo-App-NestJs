import { InjectDataSource } from "@nestjs/typeorm";
import { TodoStatusEnum } from "src/common/common.enum";
import { DataSource } from "typeorm";

export class ToDoQuery {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async getAllToDo(params: any) {
    const status = `${
      params.status
        ? params.status === `${TodoStatusEnum.DONE}`
          ? `and td.dateTime < CURRENT_TIMESTAMP()`
          : `and td.dateTime > CURRENT_TIMESTAMP()`
        : ""
    }`;
    const query = `
      select 
        td.* 
      from 
        to_do as td
      where 
        td.id is not null
        ${status}
      order by td.id ${params.order}
      limit ${params.skip},${params.take}
    `;
    const result = await this.dataSource.query(query);
    if (!result.length) return null;
    return result;
  }

  async getTodo(id: number) {
    const query = `select * from to_do as td where td.id=${id}`;
    const result = await this.dataSource.query(query);

    if (!result.length) return null;
    return result;
  }
}
