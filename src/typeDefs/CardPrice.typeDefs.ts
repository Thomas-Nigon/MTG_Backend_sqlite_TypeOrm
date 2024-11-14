import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class CardPrice extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ length: 16, nullable: true })
  usd!: string;

  @Field()
  @Column({ length: 16, nullable: true })
  usd_foil!: string;

  @Field()
  @Column({ length: 16, nullable: true })
  eur!: string;

  @Field()
  @Column({ length: 16, nullable: true })
  eur_foil!: string;

  @Field()
  @Column({ length: 16, nullable: true })
  tix!: string;
}
