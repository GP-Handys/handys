import { Request, Response } from "express";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { Wishlist } from "../models/Wishlist";

export const addToWishList = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);
  const itemId = req.params.itemId;
  try {
    await Wishlist.create({
      item_id:itemId,
      user_id:userId,
    });
    // 201 = resource created. better convention :)
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
    await Wishlist.destroy({
      where: {
        user_id,
        item_id,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const getWishList = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);
  try {
    const result =await Wishlist.findAll({ where:{ user_id: userId },attributes:["item_id"]},);
    const idsOnly = result.map(obj => obj.item_id);

    res.status(200).json(idsOnly);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};
