import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CardPrice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 16, nullable: true })
  usd!: string;

  @Column({ length: 16, nullable: true })
  usd_foil!: string;

  @Column({ length: 16, nullable: true })
  eur!: string;

  @Column({ length: 16, nullable: true })
  eur_foil!: string;

  @Column({ length: 16, nullable: true })
  tix!: string;
}
