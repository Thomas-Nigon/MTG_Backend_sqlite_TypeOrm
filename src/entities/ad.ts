import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  author!: string;

  @Column()
  price!: number;

  @Column()
  created_at!: Date;

  @Column()
  img_url!: string;

  @Column()
  city!: string;

  @ManyToOne(() => Category, (category) => category.ads)
  category!: Category;
}
