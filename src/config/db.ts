import { DataSource } from "typeorm";

import { CardPrice } from "../entities/CardPrice";
import { User } from "../entities/user";
import { Deck } from "../entities/deck";
import { CardStack } from "../entities/cardStack";
import { CardImageUris } from "../entities/CardimageUris";
import { Toto } from "../entities/toto";
import { Ad } from "../entities/ad";
import { Category } from "../entities/category";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./MTG_deck-builder.sqlite",
  entities: [
    CardStack,
    Toto,
    CardImageUris,
    CardPrice,
    User,
    Deck,
    Ad,
    Category,
  ],
  //entities: [__dirname + "/**/*.entity.{js,ts}"],
  //entities: ["src/entities/*.ts"],
  synchronize: true,
  /*   migrations: ["./src/migrations/*.ts"],
  migrationsTableName: "migrations", */
  logging: true,
});
