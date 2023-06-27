import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class DateAudit extends BaseEntity {
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
