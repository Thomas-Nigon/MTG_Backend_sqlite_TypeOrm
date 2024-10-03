import { Request, Response } from "express";

import { Deck } from "../entities/deck";
import { User } from "../entities/user";

export const createDeck = async (req: Request, res: Response) => {
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
    const newDeck = new Deck();
    newDeck.name = name;
    newDeck.description = description;
    newDeck.ownerId = ownerId;
    //newDeck.cards = deck;
    await newDeck.save();
    console.log("newDeck created");
    return res.status(201).json(newDeck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating deck" });
  }
};

export const getDecksByUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const decks = await Deck.find({ where: { ownerId: user } });
    res.json(decks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting decks" });
  }
};

export const deleteDeck = async (req: Request, res: Response) => {
  const deckId = parseInt(req.params.deckId);
  try {
    const deck = await Deck.findOne({ where: { id: deckId } });
    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }
    await Deck.remove(deck);
    res.status(204).json({ message: "Deck deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting deck" });
  }
};
