import { ApiProperty } from "@nestjs/swagger";
import { FilterDto } from "src/common/common.filter.dto";

export class TodoFilterDto extends FilterDto {
  @ApiProperty({ required: false })
  toDoType: string;
}
