import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Deck } from "./deck.typeDefs";
import { Card } from "./cards.typeDefs";

@Entity()
@ObjectType()
export class CardStack extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Card)
  @ManyToOne(() => Card, (card) => card.cardStacks, {
    cascade: true,
    eager: true,
  })
  card!: Card;

  @Column()
  quantity!: number;

  @Field(() => Deck)
  @ManyToOne(() => Deck, (deck) => deck.cardStacks)
  deck!: Deck;
}
