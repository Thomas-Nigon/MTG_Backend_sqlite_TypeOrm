"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeck = exports.getDecksByUser = exports.createDeck = void 0;
const deck_1 = require("../entities/deck");
const user_1 = require("../entities/user");
const createDeck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log("reqbody", req.body);
    const { deck, name, description, ownerId } = req.body;
    console.log("name", name);
    console.log("description", description);
    console.log("ownerId", ownerId);
    console.log("deck", deck);
    /*   console.log("my deck:", deck); */
    try {
        if (!deck) {
            return res.status(400).json({ message: "Deck is required" });
        }
        const newDeck = new deck_1.Deck();
        newDeck.name = name;
        newDeck.description = description;
        newDeck.ownerId = ownerId;
        //newDeck.cards = deck;
        yield newDeck.save();
        console.log("newDeck created");
        return res.status(201).json(newDeck);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating deck" });
    }
});
exports.createDeck = createDeck;
const getDecksByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    try {
        const user = yield user_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const decks = yield deck_1.Deck.find({ where: { ownerId: user } });
        res.json(decks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting decks" });
    }
});
exports.getDecksByUser = getDecksByUser;
const deleteDeck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deckId = parseInt(req.params.deckId);
    try {
        const deck = yield deck_1.Deck.findOne({ where: { id: deckId } });
        if (!deck) {
            return res.status(404).json({ message: "Deck not found" });
        }
        yield deck_1.Deck.remove(deck);
        res.status(204).json({ message: "Deck deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting deck" });
    }
});
exports.deleteDeck = deleteDeck;
