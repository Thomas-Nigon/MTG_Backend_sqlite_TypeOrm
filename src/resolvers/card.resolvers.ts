import { Arg } from "type-graphql";
import { Query } from "type-graphql";
import { Card } from "../typeDefs/cards.typeDefs";

export class CardResolver {
  @Query(() => [Card])
  async getCards(@Arg("page") page: number, @Arg("size") size: number) {
    const cards = await Card.find({
      take: size,
      skip: (page - 1) * size,
    });
    return cards;
  }
}
