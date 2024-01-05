import { Request, Response } from "express";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { Cart } from "../models/Cart";
import {Item} from "../models/Item"
import { connection as DB } from "../database/database";
import { it } from "node:test";

export const addToCart = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);
  const itemId = req.params.itemId;
  const { customization } = req.body;
  
  try {
    await Cart.create({
      item_id: itemId,
      user_id: userId,
      customization:customization,
    });
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const updateQuantity = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const user_id: number = extractUserFromJwt(jwt);
  const item_id = req.params.itemId;
  const { quantity } = req.body;
  try {
    await Cart.update({quantity:quantity},{where:{item_id:item_id,user_id:user_id}})
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
    const jwt: string = req.get("Authorization")?.toString()!;
    const user_id: number = extractUserFromJwt(jwt);
    const item_id = req.params.itemId;
    try {
      await Cart.destroy({
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

  export const getCart = async (req: Request, res: Response) => {
    const jwt: string = req.get("Authorization")?.toString()!;
    const user_id: number = extractUserFromJwt(jwt);

    try {
      let cart =await Cart.findAll({where:{user_id:user_id}})
  
      let query = `select * from items where id = (select item_id from carts where user_id = ${user_id})`
      const items = await DB.query(query) as Item[];

      let itemsMap:any={}
      items[0].forEach(element=>{
        itemsMap[element.id]=element;
      })
      
      res.status(200).json([cart,itemsMap]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  };


