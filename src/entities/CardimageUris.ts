import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CardImageUris extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255, nullable: true })
  small!: string;

  @Column({ length: 255, nullable: true })
  normal!: string;
}
