import argon2 from "argon2";
import { SignJWT } from "jose";
import { User } from "../typeDefs/user.typeDefs";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver(User)
export class AuthResolver {
  @Mutation(() => String)
  async auth(@Arg("email") email: string, @Arg("password") password: string) {
    const secret = process.env.APP_SECRET;
    if (!secret) {
      throw new Error("No secret found");
    }

    try {
      const user = await User.findOneBy({ email });
      if (!user) {
        throw new Error("User not found");
      }

      const decode = await argon2.verify(user.password, password);
      if (!decode) {
        throw new Error("Invalid password");
      }

      const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET);
      const accessToken = await new SignJWT({
        userId: user.id,
        email: user.email,
        userName: user.username,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10m")
        .sign(jwtSecretKey);

      return accessToken;
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }
}
