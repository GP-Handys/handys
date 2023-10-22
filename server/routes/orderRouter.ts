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
      payment_method,
      price,
      is_confirmed,
      shopId,
      items,
    } = req.body;

    const order: Order = await Order.create({
      delivery_address: delivery_address,
      payment_method: payment_method,
      price: price,
      is_confirmed: is_confirmed,
      userId: userId,
      shopId: shopId,
    });

    if (items && items.length > 0) {
      for (const itemData of items) {
        const { itemId, quantity } = itemData;

        const item: Item | null = await Item.findByPk(itemId);

        if (item == null) {
          return res
            .status(400)
            .json({ error: `Item with ID ${itemId} not found` });
        }

        // add to item_orders joint table
        await ItemOrder.create({
          quantity: quantity,
          itemId: itemId,
          orderId: order.id,
        });
      }
    }

    // 201 = resource created. better convention :)
    res.status(201).json(order);
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
