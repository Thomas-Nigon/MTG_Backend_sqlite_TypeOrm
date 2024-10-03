"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
var typeorm_1 = require("typeorm");
var CardimageUris_1 = require("../entities/CardimageUris");
var CardPrice_1 = require("../entities/CardPrice");
var card_1 = require("../entities/card");
var user_1 = require("../entities/user");
var deck_1 = require("../entities/deck");
var cardStack_1 = require("../entities/cardStack");
exports.dataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./MTG_deck-builder.sqlite",
    entities: [card_1.Card, CardimageUris_1.CardImageUris, CardPrice_1.CardPrice, user_1.User, deck_1.Deck, cardStack_1.CardStack],
    synchronize: true,
    migrations: ["./src/migrations/*.ts"],
    migrationsTableName: "migrations",
});
