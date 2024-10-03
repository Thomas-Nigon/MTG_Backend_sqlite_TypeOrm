"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const CardPrice_1 = require("../entities/CardPrice");
const user_1 = require("../entities/user");
const deck_1 = require("../entities/deck");
const cardStack_1 = require("../entities/cardStack");
const CardimageUris_1 = require("../entities/CardimageUris");
const toto_1 = require("../entities/toto");
const ad_1 = require("../entities/ad");
const category_1 = require("../entities/category");
exports.dataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./MTG_deck-builder.sqlite",
    entities: [
        cardStack_1.CardStack,
        toto_1.Toto,
        CardimageUris_1.CardImageUris,
        CardPrice_1.CardPrice,
        user_1.User,
        deck_1.Deck,
        ad_1.Ad,
        category_1.Category,
    ],
    //entities: [__dirname + "/**/*.entity.{js,ts}"],
    //entities: ["src/entities/*.ts"],
    synchronize: true,
    /*   migrations: ["./src/migrations/*.ts"],
    migrationsTableName: "migrations", */
    logging: true,
});
