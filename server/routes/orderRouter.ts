import { Order, ItemOrder } from "../models/Order";
import { Item } from "../models/Item";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { Request, Response } from "express";

export const placeOrder = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);
  try {
    const {
      delivery_address,
      phoneNumber
    } = req.body;

    // const order: Order = await Order.create({
    //   delivery_address: delivery_address,
    //   payment_method: payment_method,
    //   price: price,
    //   is_confirmed: is_confirmed,
    //   userId: userId,
    //   shopId: shopId,
    // });

    

    
    //res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const getOrderForShopId = async (req: Request, res: Response) => {
  const shopId = req.params.shopId;

  try {
    const orders = await Order.findAll({
      where: {
        shopId: shopId,
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getOrderForUserId = async (req: Request, res: Response) => {
  const userId: number = Number(req.params.userId);

  try {
    const orders = await Order.findAll({
      where: {
        userId: userId,
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
