import { Request, Response } from "express";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { Wishlist } from "../models/Wishlist";
import { connection as DB } from "../database/database";

export const addToWishList = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);
  const itemId = req.params.itemId;
  try {
    let item = await Wishlist.findOne({where: {
      user_id:userId,
      item_id:itemId,
    },})

    if(item==null){
    await Wishlist.create({
      item_id: itemId,
      user_id: userId,
    });
  }
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const removeFromWishList = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const user_id: number = extractUserFromJwt(jwt);
  const item_id = req.params.itemId;
  try {
    let item = await Wishlist.findOne({where: {
      user_id,
      item_id,
    },})

    if(item!=null){
      item.destroy()
    }
    
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const getWishList = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);
  const data = req.params.data;

  try {
    if (data == "ids") {
      const result = await Wishlist.findAll({
        where: { user_id: userId },
        attributes: ["item_id"],
      });
      const idsOnly = result.map((obj) => obj.item_id);

      res.status(200).json(idsOnly);
    } else {
      const query = `SELECT * FROM items WHERE id LIKE (select item_id from wishlists where user_id Like ${userId} and id like item_id);`;
      const searchResult = await DB.query(query);
      res.status(200).json(searchResult);
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};
