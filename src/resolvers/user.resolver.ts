import { Arg, Field, InputType, Mutation, Query } from "type-graphql";

import { Resolver } from "type-graphql";
import { User } from "../typeDefs/user.typeDefs";
import { BaseEntity } from "typeorm";

@InputType()
class UserInput extends BaseEntity {
  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers() {
    return await User.find();
  }

  @Query(() => User)
  async getUserById(@Arg("id") id: string) {
    return await User.findOneBy({ id });
  }

  @Mutation(() => User)
  async addUser(@Arg("data") { username, email, password }: UserInput) {
    const user = User.create({ username, email, password });
    await user.save();
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: string,
    @Arg("data") { username, email, password }: UserInput
  ) {
    const user = await User.findOneBy({ id });
    if (!user) throw new Error("User not found");
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    const result = await User.delete(id);
    return result.affected === 1;
  }
}
