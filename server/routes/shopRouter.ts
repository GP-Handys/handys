import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { User } from "../models/User";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { Shop } from "../models/Shop";
import { connection as DB } from "../database/database";
import { ShopReview } from "../models/ShopReview";

dotenv.config();

export const createShop = async (req: Request, res: Response) => {
  try {
    const { name, pfp_url, bio, socialMediaLink } = req.body;
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);

    await Shop.create({ name, pfp_url, bio, socialMediaLink, userId });

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
      res.status(200).json("Shop is deleted");
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
    res.status(200).json(searchResult);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addReview = async (req: Request, res: Response) => {
  try {
    const shopId = req.params.shopId;
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);
    const { content, rating } = req.body;
    const data = { content, rating, userId, shopId };
    const shop = await Shop.findByPk(shopId);

    if (shop == null) {
      res.sendStatus(404);
      return;
    }

    const review = await ShopReview.create(data);
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
    let review = await ShopReview.findByPk(reviewId);

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

export const getShopReviews = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.shopId;
    const result = await ShopReview.findAll({ where: { itemId: itemId } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const pendingShops = async (req: Request, res: Response) => {
  try {
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);
    const user = await User.findByPk(userId);

    if (user!.is_sys_admin) {
      const result = await Shop.findAll({ where: { is_approved: false } });
      res.status(200).json(result);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const approveShop = async (req: Request, res: Response) => {
  try {
    const jwt = extractUserFromJwt("Authorization")?.toString()!;
    const userId = extractUserFromJwt(jwt);
    const user = await User.findByPk(userId);
    const shopId = req.params.shopId;
    const shop = await Shop.findByPk(shopId);

    if (user!.is_sys_admin) {
      await shop?.update({ is_approved: true });
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserShops = async (req: Request, res: Response) => {
  try {    
    const userId = req.params.userId;
    let user = await User.findByPk(userId)
    
    if(user!=null){
      let shops =await Shop.findAll({where:{userId:userId}});
      return res.send(shops)
    }
    else{
      res.sendStatus(403);  
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
