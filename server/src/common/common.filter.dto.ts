import { ApiProperty } from "@nestjs/swagger";

export class FilterDto {
  @ApiProperty({ required: false })
  take: number;

  @ApiProperty({ required: false })
  skip: number;

  @ApiProperty({ required: false, enum: ["ASC", "DESC"] })
  order: string;
}
