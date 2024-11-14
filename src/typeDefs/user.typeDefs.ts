import { ObjectType } from "type-graphql";
import { ID } from "type-graphql";
import { Field } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Deck } from "./deck.typeDefs";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column({ length: 255 })
  username!: string;

  @Field()
  @Column({ length: 64, unique: true })
  email!: string;

  @Field()
  @Column({ length: 255 })
  password!: string;

  @Field(() => [Deck])
  @OneToMany(() => Deck, (deck) => deck.ownerId)
  decks!: Deck[];
}
