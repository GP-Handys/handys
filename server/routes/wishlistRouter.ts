import { Request, Response } from "express";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { Wishlist } from "../models/Wishlist";

export const addToWishList = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);
  const itemId = req.params.itemId;
  try {
    await Wishlist.create({
      itemId,
      userId,
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
  const userId: number = extractUserFromJwt(jwt);
  const itemId = req.params.itemId;
  try {
    await Wishlist.destroy({
      where: {
        userId,
        itemId,
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
    const result = Wishlist.findAll({ where: { userId: userId } });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};
