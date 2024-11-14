import { Arg, Field, InputType, Mutation, Query } from "type-graphql";

import { Resolver } from "type-graphql";
import { User } from "../typeDefs/user.typeDefs";
import { BaseEntity } from "typeorm";

@InputType()
export class UserInput extends BaseEntity {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}

@Resolver(User)
export class UserResolver {
  /**
   * Retrieves all users.
   * @returns {Promise<User[]>} A promise that resolves to an array of users.
   */
  @Query(() => [User])
  async getUsers() {
    return await User.find();
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} id - The ID of the user.
   * @returns {Promise<User | null>} A promise that resolves to the user or null if not found.
   */
  @Query(() => User)
  async getUserById(@Arg("id") id: string) {
    return await User.findOneBy({ id });
  }

  /**
   * Adds a new user.
   * @param {UserInput} data - The user data.
   * @returns {Promise<User>} A promise that resolves to the newly created user.
   */
  @Mutation(() => User)
  async addUser(@Arg("data") { username, email, password }: UserInput) {
    const user = User.create({ username, email, password });
    await user.save();
    return user;
  }

  /**
   * Updates an existing user.
   * @param {string} id - The ID of the user to update.
   * @param {UserInput} data - The new user data.
   * @returns {Promise<User>} A promise that resolves to the updated user.
   * @throws Will throw an error if the user is not found.
   */
  @Mutation(() => User)
  async updateUser(@Arg("id") id: string, @Arg("data") data: UserInput) {
    const user = await User.findOneBy({ id });
    if (!user) throw new Error("User not found");
    Object.assign(user, data);
    await user.save();
    return user;
  }

  /**
   * Deletes a user by their ID.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if the user was deleted, false otherwise.
   */
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    const result = await User.delete(id);
    return result.affected === 1;
  }
}
