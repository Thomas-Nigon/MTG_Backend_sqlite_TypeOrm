import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { CardImageUris } from "./CardimageUris";
import { CardPrice } from "./CardPrice";

@Entity()
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255, nullable: true })
  card_id!: string;

  @Column({ length: 255, nullable: true })
  oracle_id!: string;

  @Column({ length: 255, nullable: true })
  name!: string;

  @Column({ length: 64, nullable: true })
  lang!: string;

  @Column({ length: 255, nullable: true })
  released_at!: string;

  @OneToOne(() => CardImageUris, { cascade: true, eager: true, nullable: true })
  @JoinColumn()
  image_uris!: CardImageUris;

  @Column({ length: 8, nullable: true })
  mana_cost!: string;

  @Column({ type: "float", nullable: true })
  cmc!: number;

  @Column({ length: 255, nullable: true })
  type_line!: string;

  @Column({ type: "simple-array", nullable: true })
  colors!: string[];

  @Column({ type: "simple-array", nullable: true })
  color_identity!: string[];

  @Column({ type: "simple-array", nullable: true })
  produced_mana!: string[];

  @Column({ length: 255, nullable: true })
  set!: string;

  @Column({ length: 255, nullable: true })
  set_name!: string;

  @Column({ length: 255, nullable: true })
  rarity!: string;

  @Column({ length: 255, nullable: true })
  border_color!: string;

  @OneToOne(() => CardPrice, { cascade: true, eager: true })
  @JoinColumn()
  prices!: CardPrice;
}
/*   @OneToMany(() => CardStack, (cardStack) => cardStack.card)
  cardStacks!: CardStack[]; */
