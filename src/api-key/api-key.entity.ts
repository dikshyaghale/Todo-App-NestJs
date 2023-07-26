import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "api_key" })
export class ApiKeyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  key: string;
}
