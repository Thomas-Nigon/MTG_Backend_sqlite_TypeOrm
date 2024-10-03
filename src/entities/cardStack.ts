import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
} from "typeorm";

import { Deck } from "./deck";
import { Card } from "./cards";

@Entity()
export class CardStack extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  /*   @ManyToOne(() => Card, (card) => card.cardStacks, {
    cascade: true,
    eager: true,
  })
  card!: Card; */

  @Column()
  quantity!: number;

  @ManyToOne(() => Deck, (deck) => deck.cardStacks)
  deck!: Deck;
}
