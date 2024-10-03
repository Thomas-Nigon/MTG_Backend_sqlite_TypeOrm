import dotenv from "dotenv";

import { NextFunction, Request, Response } from "express";
import argon2 from "argon2";
import { User } from "../entities/user";
import { SignJWT } from "jose";

export const auth = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("reqbodyuser:", req.body);
  console.log(email, password);
  const secret = process.env.APP_SECRET;
  if (!secret) {
    return res.status(500).json({
      message: "No secret found",
    });
  }
  console.log("auth");
  try {
    const user = await User.findOneBy({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const decode = await argon2.verify(user.password, password);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid password",
      });
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

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: true,
      sameSite: "lax",
    });
    return res.status(200).json({
      message: "User authenticated",
      id: user.id,
      email: user.email,
      username: user.username,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
  console.log("user found, get user info and generate token");
};
