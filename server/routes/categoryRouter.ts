import { Request, Response } from "express";
import { User } from "../models/User";
import { Category } from "../models/Category";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { literal } from "sequelize";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { category_name, category_pfp } = req.body;
    
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);
    const user = await User.findByPk(userId);

    if (true) {
      const category = await Category.create({
        category_name,
        category_pfp,
      });
      res.status(200).json(category);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);
    const user = await User.findByPk(userId);
    let category = await Category.findByPk(categoryId);
    if (category == null) {
      res.sendStatus(404);
      return;
    }
    if (user!.is_sys_admin) {
      await category.destroy();
      res.status(200).json("category is deleted");
    } else {
      res.send(403);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const randomCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({
      order: literal("rand()"),
      limit: 7,
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};
