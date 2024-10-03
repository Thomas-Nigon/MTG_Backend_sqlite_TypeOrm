"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deckController_1 = require("../controllers/deckController");
const router = (0, express_1.Router)();
router.post("/decks/create", deckController_1.createDeck);
router.get("/users/:userId/decks", deckController_1.getDecksByUser);
router.delete("/decks/delete/:deckId", deckController_1.deleteDeck);
exports.default = router;
