import { Arg, Field, InputType } from "type-graphql";
import { Query } from "type-graphql";
import { Card } from "../typeDefs/cards.typeDefs";
import { getCardsColors } from "../controllers/cardController";
import { Like } from "typeorm";

@InputType()
class CardQuery {
  @Field({ nullable: true })
  rarity?: string;
  @Field({ nullable: true })
  colors?: string;
  @Field({ nullable: true })
  set?: string;
}

export class CardResolver {
  /**
   * Retrieves all cards from the database.
   * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects.
   * @throws Will throw an error if no cards are found.
   */
  @Query(() => [Card])
  async getCards() {
    const cards = await Card.find();
    if (!cards) throw new Error("No cards found");
    return cards;
  }

  /**
   * Retrieves a paginated list of cards based on query parameters.
   * @param {number} page - The page number to retrieve.
   * @param {number} size - The number of cards per page.
   * @param {CardQuery} data - The query parameters for filtering cards.
   * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects.
   * @throws Will throw an error if no cards are found or if there is an error retrieving cards.
   */
  @Query(() => [Card])
  async getCardsQuery(
    @Arg("page") page: number,
    @Arg("size") size: number,
    @Arg("data") data: CardQuery
  ) {
    let whereClause = {};
    if (data.rarity) {
      whereClause = { ...whereClause, rarity: data.rarity as string };
    }
    if (data.colors && data.colors !== "all") {
      whereClause = { ...whereClause, colors: data.colors as string };
    }
    if (data.set && data.set !== "all") {
      whereClause = { ...whereClause, set: data.set as string };
    }
    whereClause = { ...whereClause, set: data.set as string };

    try {
      const [cards, total] = await Card.findAndCount({
        where: whereClause,
        take: size,
        skip: (page - 1) * size,
        order: {
          name: "ASC",
        },
      });
      if (cards.length === 0) {
        throw new Error("No cards found");
      }
      return cards;
      /*    return  {
          data: cards,
          total,
          page,
          pageCount: Math.ceil(total / size),
        }; */
    } catch (error) {
      console.error(error);
      throw new Error("Error getting cards");
    }
  }

  /**
   * Retrieves a list of unique card colors.
   * @returns {Promise<string[]>} A promise that resolves to an array of unique card colors.
   * @throws Will throw an error if there is an issue retrieving card colors.
   */
  @Query(() => [String])
  async getCardsColors() {
    try {
      const colors = await Card.find({
        select: ["colors"],
      });
      const uniqueColors = [
        ...new Set(colors.flatMap((color) => color.colors)),
      ];
      return uniqueColors;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting colors");
    }
  }

  /**
   * Retrieves a list of unique card types.
   * @param {string} type_line - The type line to filter card types.
   * @returns {Promise<string[]>} A promise that resolves to an array of unique card types.
   * @throws Will throw an error if there is an issue retrieving card types.
   */
  @Query(() => [String])
  async getCardsTypes(@Arg("type_line") type_line: string) {
    let whereClause = {};
    if (type_line) {
      whereClause = { ...whereClause, type_line: type_line as string };
    }
    try {
      const types = await Card.find({
        select: ["type_line"],
      });
      const uniqueTypes = [...new Set(types.flatMap((t) => t.type_line))];
      return uniqueTypes;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting types");
    }
  }

  /**
   * Retrieves a list of 10 cards by autocomplete name.
   * @param {string} name - The name or partial name of the card to search for.
   * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects.
   * @throws Will throw an error if there is an issue retrieving the card.
   */
  @Query(() => [Card])
  async getCardByName(@Arg("name") name: string) {
    try {
      const card = await Card.find({
        where: {
          name: Like(`%${name}%`),
        },
        take: 10,
      });
      return card;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting card");
    }
  }
}
