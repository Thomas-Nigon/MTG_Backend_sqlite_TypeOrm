import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Deck } from "./deck";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  username!: string;

  @Column({ length: 64, unique: true })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @OneToMany(() => Deck, (deck) => deck.ownerId)
  decks!: Deck[];
}
