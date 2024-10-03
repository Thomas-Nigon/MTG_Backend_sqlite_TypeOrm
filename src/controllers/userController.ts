import { Request, Response } from "express";
import { User } from "../entities/user";

export const createUser = async (req: Request, res: Response) => {
  const user: User = req.body;
  try {
    const NewUser = new User();
    NewUser.username = user.username;
    NewUser.email = user.email;
    NewUser.password = user.password;
    await NewUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send("Error creating user");
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const rows = await User.find();
    if (rows.length !== 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    res.status(500).send("Error getting users:");
  }
};
