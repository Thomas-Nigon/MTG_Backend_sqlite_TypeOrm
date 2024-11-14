import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { User } from "../typeDefs/user.typeDefs";
import { Deck } from "../typeDefs/deck.typeDefs";
import { CardStack } from "../typeDefs/cardStack.typeDefs";

@InputType()
class DeckInput extends BaseEntity {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  img_url!: string;

  @Field()
  ownerId!: string;

  @Field(() => [CardStack])
  deck!: CardStack[];
}

@Resolver(Deck)
export class DeckResolver {
  /**
   * Retrieves all decks.
   * @returns {Promise<Deck[]>} A promise that resolves to an array of decks.
   */
  @Query(() => [Deck])
  async getDecks() {
    return await Deck.find();
  }

  @Mutation(() => Deck)
  async createDeck(
    @Arg("data") { deck, name, description, ownerId }: DeckInput
  ) {
    try {
      if (!deck) throw new Error("No deck provided");

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
  }
}
