import { ApiProperty } from "@nestjs/swagger";
import { TodoStatusEnum } from "src/common/common.enum";
import { FilterDto } from "src/common/common.filter.dto";

export class TodoFilterDto extends FilterDto {
  @ApiProperty({
    required: false,
    enum: TodoStatusEnum,
  })
  status: TodoStatusEnum;
}
