import { Request, Response, query } from "express";
import { User } from "../models/User";
import { Item } from "../models/Item";
import { Shop } from "../models/Shop";
import { ItemReview } from "../models/ItemReview";
import { connection as DB } from "../database/database";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { Sequelize } from "sequelize";
import { Category } from "../models/Category";

export const addItem = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      base_price,
      discount,
      quantity,
      customization,
      img_url,
      categories,
    } = req.body;
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);
    const shopId = req.params.shopId;
    const shop = await Shop.findByPk(shopId);
    const user = await User.findByPk(userId);
    if (user!.is_sys_admin || shop!.userId == userId) {
      const item = await Item.create({
        name,
        description,
        base_price,
        discount,
        quantity,
        customization,
        shopId,
        img_url,
      });

      categories.forEach(async (categoryId: number) => {
        let category = Category.findByPk(categoryId);
        if (category != null) {
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); 
          let query = `insert into item_category (itemId , categoryId , createdAt,updatedAt) values (${item.id},${categoryId},'${formattedDate}','${formattedDate}')`;
          await DB.query(query);
        }
      });

      res.status(200).json("Item created successfully");
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    
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
      customization,
      categories,
      img_url
    } = req.body;
    const itemId: number = Number(req.params.itemId);
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);
    const user = await User.findByPk(userId);
    let item = await Item.findByPk(itemId);
    const shop = await Shop.findByPk(item?.shopId);

    if (item == null || shop == null) {
      res.sendStatus(404);
      return;
    }

    if (
      user!.is_sys_admin ||
      (shop.userId == userId && shop.id == item.shopId)
    ) {
      item = await item.update({
        name,
        description,
        base_price,
        discount,
        quantity,
        customization,
        img_url
      });

      // categories.forEach(async (categoryId: number) => {
      //   await DB.query("DELETE FROM item_category WHERE itemId=" + itemId);

      //   let category = Category.findByPk(categoryId);
      //   if (category != null) {
      //     let query = `insert into item_category (itemId , categoryId) values (${
      //       item!.id
      //     },${categoryId})`;
      //     await DB.query(query);
      //   }
      // });

      res.status(200).json("Item information has been updated!");
    }
  } catch (error) {
    console.log(error)
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

export const addRating = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId;
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);
    const { rating } = req.body;
    const data = { rating, userId, itemId };
    const item = await Item.findByPk(itemId);

    if (item == null) {
      res.sendStatus(404);
      return;
    }
    await ItemReview.create(data);
    const averageRating = await ItemReview.findOne({
      attributes: [[Sequelize.fn("AVG", Sequelize.col("rating")), "average"]],
      where: { itemId: itemId },
    });
    await Item.update(
      { rating: averageRating?.toJSON().average },
      { where: { id: itemId } }
    );
    res.status(200).json("Shop rating submitted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const searchItem = async (req: Request, res: Response) => {
  try {
    const search = req.query.search;
    const query = `SELECT * FROM items WHERE name LIKE '%${search}%' OR description LIKE '%${search}%'
     OR id LIKE (select itemId from item_category where categoryId Like 
      (select categoryId from categories where category_name LIKE '%${search}%'));`;

    const searchResult = await DB.query(query);
    res.status(200).json(searchResult[0]);
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

export const getRandomItems = async (req: Request, res: Response) => {
  try {
    let result = await Item.findAll({
      order: [Sequelize.fn("RAND")],
      limit: 10,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getbyCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;

    const query = `SELECT * FROM items WHERE id LIKE (select itemId from item_category where categoryId Like ${categoryId});`;
    const searchResult = await DB.query(query);
    res.status(200).json(searchResult[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};
