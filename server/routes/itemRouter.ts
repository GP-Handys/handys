import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { User } from "../models/User";
import { Item } from "../models/Item";
import { Shop } from "../models/Shop";
import { ItemReview } from "../models/ItemReview";
import { connection as DB } from "../database/database";
import { extractUserFromJwt } from "../utils/tokenUtils";

export const addItem = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      base_price,
      discount,
      quantity,
      is_customizable,
      shopId,
    } = req.body;
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);
    const shop = await Shop.findByPk(shopId);
    const user = await User.findByPk(userId);

    if (user!.is_sys_admin || shop!.userId == userId) {
      const item = await Item.create({
        name,
        description,
        base_price,
        discount,
        quantity,
        is_customizable,
        shopId,
      });

      if (item) {
        res.status(200).json("Item created successfully");
      } else {
        res.status(500).json("Failed to create item");
      }
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      base_price,
      discount,
      quantity,
      is_customizable,
      shopId,
    } = req.body;
    const itemId = req.params.itemID;
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);
    const shop = await Shop.findByPk(shopId);
    const user = await User.findByPk(userId);
    let item = await Item.findByPk(itemId);

    if (item == null || shop == null) {
      res.sendStatus(404);
      return;
    }

    if (
      user!.is_sys_admin ||
      (shop.userId == userId && shopId == item.shopId)
    ) {
      item = await item.update({
        name,
        description,
        base_price,
        discount,
        quantity,
        is_customizable,
        shopId,
      });
      if (item) {
        res.status(200).json("item modified");
      } else {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemID;
    const jwt: string = req.get("Authorization")?.toString()!;

    const userId = extractUserFromJwt(jwt);
    const user = await User.findByPk(userId);
    let item = await Item.findByPk(itemId);
    if (item == null) {
      res.sendStatus(404);
      return;
    }
    const shopId = item.shopId;
    const shop = await Shop.findByPk(shopId);

    if (shop == null) {
      res.sendStatus(404);
      return;
    }

    if (
      user!.is_sys_admin ||
      (shop.userId == userId && shopId == item.shopId)
    ) {
      await item.destroy();
      res.status(200).json("Item deleted");
    } else {
      res.send(403);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getItem = async (req: Request, res: Response) => {
  const itemId = req.params.itemID;
  try {
    const item = await Item.findByPk(itemId);
    if (item) {
      res.status(200).json(item);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addReviewToItem = async (req: Request, res: Response) => {
  //TODO : check if user buy the item
  try {
    const itemId = req.params.itemID;
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);
    const { content, rating } = req.body;
    const data = { content, rating, userId, itemId };
    const item = await Item.findByPk(itemId);

    if (item == null) {
      res.sendStatus(404);
      return;
    }

    const review = await ItemReview.create(data);
    res.status(200).json("Review Added successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const removeReviewFromItem = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.reviewID;
    const jwt: string = req.get("Authorization")?.toString()!;

    const userId = extractUserFromJwt(jwt);
    const user = await User.findByPk(userId);
    let review = await ItemReview.findByPk(reviewId);

    if (review == null) {
      res.sendStatus(404);
      return;
    }

    if (user!.is_sys_admin || userId == review.userId) {
      await review.destroy();
      res.status(200).json("Review removed successfully ");
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const searchItem = async (req: Request, res: Response) => {
  //TODO : add search with category
  try {
    const search = req.query.search;
    const query = `SELECT * FROM items WHERE name LIKE '%${search}%' OR description LIKE '%${search}%';`;
    const searchResult = await DB.query(query);
    res.status(200).json(searchResult);
  } catch (error) {
    res.status(500).json(error);
  }
};
