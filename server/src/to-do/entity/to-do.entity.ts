import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DateAudit } from "src/common/date.audit";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

@Entity({ name: "to_do" })
export class ToDoEntity extends DateAudit {
  @ApiHideProperty()
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @Column({ nullable: false, type: "longtext" })
  description: string;

  @ApiProperty()
  @Column({ nullable: false })
  dateTime: Date;
}
