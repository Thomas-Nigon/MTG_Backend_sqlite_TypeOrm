import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  firstname!: string;

  @Column()
  name!: string;

  @Column()
  birthday!: Date;

  @Column()
  address!: string;
}
