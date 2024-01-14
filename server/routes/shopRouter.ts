import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { User } from "../models/User";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { Shop } from "../models/Shop";
import { connection as DB } from "../database/database";
import { ShopReview } from "../models/ShopReview";
import { Sequelize } from "sequelize";
import { Item } from "../models/Item";

dotenv.config();

export const createShop = async (req: Request, res: Response) => {
  try {
    const { name, pfp_url, bio, socialMediaLink, phone_number } = req.body;
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);

    await Shop.create({
      name,
      pfp_url,
      bio,
      socialMediaLink,
      phone_number,
      userId,
    });

    res.status(200).json("Shop is created");
  } catch (error) {
    res.status(500).json("something went wrong");
  }
};

export const updateShop = async (req: Request, res: Response) => {
  try {
    const { name, pfp_url, bio, socialMediaLink } = req.body;
    const shopId = req.params.shopId;
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);

    const user = await User.findByPk(userId);
    const shop = await Shop.findByPk(shopId);

    if (user?.is_sys_admin || shop?.userId == userId) {
      await Shop.update(
        { name, pfp_url, bio, socialMediaLink },
        {
          where: {
            id: shopId,
          },
        }
      );

      res.status(200).json("Shop is updated");
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteShop = async (req: Request, res: Response) => {
  try {
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);
    const shopId = req.params.shopId;
    const user = await User.findByPk(userId);
    const shop = await Shop.findByPk(shopId);

    if (user?.is_sys_admin || shop?.userId == userId) {
      await shop?.destroy();
      await Item.destroy({ where: { shopId: shopId } });
      res.status(200).json("Your shop has been deleted successfully!");
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getShop = async (req: Request, res: Response) => {
  try {
    const shopId = req.params.shopId;
    const shop = await Shop.findByPk(shopId);

    if (shop == null) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const searchShop = async (req: Request, res: Response) => {
  try {
    const search = req.query.search;
    const query = `SELECT * FROM shops WHERE name LIKE '%${search}%' OR bio LIKE '%${search}%';`;
    const searchResult = await DB.query(query);
    res.status(200).json(searchResult[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addRating = async (req: Request, res: Response) => {
  try {
    const shopId = req.params.shopId;
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);
    const { rating } = req.body;
    const data = { rating, userId, shopId };
    const shop = await Shop.findByPk(shopId);

    if (shop == null) {
      res.sendStatus(404);
      return;
    }

    await ShopReview.create(data);
    const averageRating = await ShopReview.findOne({
      attributes: [[Sequelize.fn("AVG", Sequelize.col("rating")), "average"]],
      where: { shopId: shopId },
    });
    await Shop.update(
      { rating: averageRating?.toJSON().average },
      { where: { id: shopId } }
    );
    res.status(200).json("Shop rating submitted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserShops = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    let user = await User.findByPk(userId);

    if (user != null) {
      let shops = await Shop.findAll({ where: { userId: userId } });
      return res.send(shops);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getRecommendedShops = async (req: Request, res: Response) => {
  try {
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);
    const user = await User.findByPk(userId);
    if (user != null) {
      let shops = await Shop.findAll({
        order: Sequelize.literal("RAND()"),
        limit: 8,
      });
      return res.send(shops);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
