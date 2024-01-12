import { Order, ItemOrder } from "../models/Order";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { Request, Response } from "express";
import { Cart } from "../models/Cart";

export const placeOrder = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);
  try {
    const { street_name, apt_number, floor, phone_number, price, shopId } =
      req.body;

    const order: Order = await Order.create({
      userId: userId,
      shopId: shopId,
      street_name,
      apt_number,
      floor,
      phone_number,
      price,
    });

    let cart: Cart[] = await Cart.findAll({ where: { user_id: userId } });

    cart.forEach(async (element: Cart) => {
      await ItemOrder.create({
        orderId: order.id,
        itemId: element.item_id,
        customization: element.customization,
        quantity: element.quantity,
      });
    });

    await Cart.destroy({ where: { user_id: userId } });

    return res.status(200).json({ cart });
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

export const getOrdersForUserId = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);

  try {
    const orders: Order[] = await Order.findAll({
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
