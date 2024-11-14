import { Field, InputType, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { User } from "../typeDefs/user.typeDefs";
import { Deck } from "../typeDefs/deck.typeDefs";

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
}

@Resolver(Deck)
export class DeckResolver {
  @Query(() => [Deck])
  async getDecks() {
    return await Deck.find();
  }
}
