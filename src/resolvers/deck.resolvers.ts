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
  cardStacks!: CardStack[];
}

@Resolver(Deck)
export class DeckResolver {
  /**
   * Retrieves all decks.
   * @returns {Promise<Deck[]>} A promise that resolves to an array of decks.
   */
  @Query(() => [Deck])
  async getDecks() {
    const decks = await Deck.find();
    if (!decks) throw new Error("No decks found");
    return decks;
  }

  /**
   * Creates a new deck.
   * @param {DeckInput} data - The input data for creating a deck, including card stacks, name, description, and owner ID.
   * @returns {Promise<Deck>} A promise that resolves to the newly created deck.
   * @throws {Error} Throws an error if no card stacks are provided or if there is an internal server error.
   */
  @Mutation(() => Deck)
  async createDeck(
    @Arg("data") { cardStacks, name, description, ownerId }: DeckInput
  ) {
    try {
      if (!cardStacks) throw new Error("No deck provided");

      const newDeck = new Deck();
      newDeck.name = name;
      newDeck.description = description;
      newDeck.ownerId = ownerId;
      newDeck.cardStacks = cardStacks;

      await newDeck.save();
      return newDeck;
    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Error creating deck:", error.message);
        throw new Error(error.message);
      } else {
        console.error("Error creating deck:", error);
        throw new Error("Internal server error");
      }
    }
  }

  /**
   * Retrieves all decks owned by a specific user.
   * @param {string} userId - The ID of the user whose decks are to be retrieved.
   * @returns {Promise<Deck[]>} A promise that resolves to an array of decks owned by the user.
   * @throws {Error} Throws an error if the user is not found or if no decks are found for the user.
   */
  @Query(() => [Deck])
  async getDecksByUser(@Arg("userId") userId: string) {
    const user = await User.findOneBy({ id: userId });
    if (!user) throw new Error("No user found");
    const decks = await Deck.find({ where: { ownerId: user.id } });

    if (!decks) throw new Error("No decks found");
    return decks;
  }

  /**
   * Deletes a deck by its ID.
   * @param {string} id - The ID of the deck to be deleted.
   * @returns {Promise<boolean>} A promise that resolves to true if the deck was successfully deleted, otherwise false.
   */
  @Mutation(() => Boolean)
  async deleteDeck(@Arg("id") id: string) {
    const result = await Deck.delete(id);
    return result.affected === 1;
  }
}
