import { query, Request, Response } from "express";
import { Category } from "../entities/category";

export const getCategories = async (req: Request, res: Response) => {
  const catFilter = req.query.catFilter;
  let whereClause = {};
  if (catFilter) {
    whereClause = { name: catFilter };
  }
  try {
    const categories = await Category.find({ where: whereClause });
    if (categories.length === 0) {
      res.status(404).send("No categories found");
    } else {
      res.json(categories);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting categories");
  }
};
