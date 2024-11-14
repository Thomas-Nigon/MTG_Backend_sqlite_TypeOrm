import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.typeDefs";
import { CardStack } from "./cardStack.typeDefs";

@Entity()
@ObjectType()
export class Deck extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column({ length: 255 })
  name!: string;

  @Field()
  @Column({ length: 255 })
  description!: string;

  @Field()
  @Column({ length: 255, default: "https://via.placeholder.com/150" })
  img_url!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.decks)
  ownerId!: string;

  @Field(() => [CardStack])
  @OneToMany(() => CardStack, (cardStack) => cardStack.deck, { cascade: true })
  cardStacks!: CardStack[];
}
