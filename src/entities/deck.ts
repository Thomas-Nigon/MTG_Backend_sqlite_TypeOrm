import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { CardStack } from "./cardStack";

@Entity()
export class Deck extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  name!: string;

  @Column({ length: 255 })
  description!: string;

  @Column({ length: 255, default: "https://via.placeholder.com/150" })
  img_url!: string;

  @ManyToOne(() => User, (user) => user.decks)
  ownerId!: User;

  @OneToMany(() => CardStack, (cardStack) => cardStack.deck, { cascade: true })
  cardStacks!: CardStack[];
}
