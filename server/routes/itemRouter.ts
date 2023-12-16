import { Request, Response } from "express";
import { User } from "../models/User";
import { Item } from "../models/Item";
import { Shop } from "../models/Shop";
import { ItemReview } from "../models/ItemReview";
import { connection as DB } from "../database/database";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { Sequelize } from "sequelize";

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
      category,
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
        category,
      });

      res.status(200).json("Item created successfully");
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
    } = req.body;
    const itemId = req.params.itemId;
    const shopId = Number(req.query.shopId);
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
      res.status(200).json("item modified");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId;
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
  const itemId = req.params.itemId;
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

export const addReview = async (req: Request, res: Response) => {
  //TODO : check if user buy the item
  try {
    const itemId = req.params.itemId;
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

export const removeReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.reviewId;
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
  try {
    const search = req.query.search;
    const query = `SELECT id FROM items WHERE name LIKE '%${search}%' OR description LIKE '%${search}%'
     OR id LIKE (select itemId from item_category where categoryId Like 
      (select categoryId from categories where category_name LIKE '%${search}%' and is_approved LIKE 1));`;

    const searchResult = await DB.query(query);
    res.status(200).json(searchResult);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getByShop = async (req: Request, res: Response) => {
  try {
    const shopId = req.params.shopId;
    const result = await Item.findAll({ where: { shopId: shopId } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getReviews = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.shopId;
    const result = await ItemReview.findAll({ where: { itemId: itemId } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getRandomItems = async (req: Request, res: Response) => {
  try{
    let result = await Item.findAll({ order:[Sequelize.fn('RAND')],limit:10})
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error);
  }

}
