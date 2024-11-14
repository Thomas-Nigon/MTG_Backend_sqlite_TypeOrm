import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { CardStack } from "./cardStack.typeDefs";
import { CardImageUris } from "./cardImageUris.typeDefs";
import { CardPrice } from "./CardPrice.typeDefs";
@Entity()
@ObjectType()
export class Card extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ length: 255, nullable: true })
  card_id!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  oracle_id!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  name!: string;

  @Field()
  @Column({ length: 64, nullable: true })
  lang!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  released_at!: string;

  @Field(() => CardImageUris)
  @OneToOne(() => CardImageUris, { cascade: true, eager: true, nullable: true })
  @JoinColumn()
  image_uris!: CardImageUris;

  @Field()
  @Column({ length: 8, nullable: true })
  mana_cost!: string;

  @Field()
  @Column({ type: "float", nullable: true })
  cmc!: number;

  @Field()
  @Column({ length: 255, nullable: true })
  type_line!: string;

  @Field(() => [String])
  @Column({ type: "simple-array", nullable: true })
  colors!: string[];

  @Field(() => [String])
  @Column({ type: "simple-array", nullable: true })
  color_identity!: string[];

  @Field(() => [String])
  @Column({ type: "simple-array", nullable: true })
  produced_mana!: string[];

  @Field()
  @Column({ length: 255, nullable: true })
  set!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  set_name!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  rarity!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  border_color!: string;

  @Field(() => CardPrice)
  @OneToOne(() => CardPrice, { cascade: true, eager: true })
  @JoinColumn()
  prices!: CardPrice;

  @Field(() => [CardStack])
  @OneToMany(() => CardStack, (cardStack) => cardStack.card)
  cardStacks!: CardStack[];
}
