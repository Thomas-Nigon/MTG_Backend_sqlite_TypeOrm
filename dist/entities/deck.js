"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const cardStack_1 = require("./cardStack");
let Deck = class Deck extends typeorm_1.BaseEntity {
};
exports.Deck = Deck;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Deck.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Deck.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Deck.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: "https://via.placeholder.com/150" }),
    __metadata("design:type", String)
], Deck.prototype, "img_url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.decks),
    __metadata("design:type", user_1.User)
], Deck.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cardStack_1.CardStack, (cardStack) => cardStack.deck, { cascade: true }),
    __metadata("design:type", Array)
], Deck.prototype, "cardStacks", void 0);
exports.Deck = Deck = __decorate([
    (0, typeorm_1.Entity)()
], Deck);
