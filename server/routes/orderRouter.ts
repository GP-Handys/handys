import { Order, ItemOrder } from "../models/Order";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { Request, Response } from "express";
import { Cart } from "../models/Cart";

export const placeOrder = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);
  try {
    const {
      street_name,
      apt_number,
      floor,
      phone_number,
      price,
      buildingNumber,
      instructions,
    } = req.body;

    let cart: Cart[] = await Cart.findAll({ where: { user_id: userId } });

    const order: Order = await Order.create({
      userId: userId,
      shopId: cart[0].shop_id,
      street_name,
      apt_number,
      floor,
      phone_number,
      price,
      building_number: buildingNumber,
      instructions,
    });

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

export const getItemsForOrderId = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);

  try {
    const itemOrders: ItemOrder[] = await ItemOrder.findAll({
      where: {
        orderId: orderId,
      },
    });
    if (itemOrders.length == 0) {
      res.status(404).json("No items found");
      return;
    }
    res.status(200).json(itemOrders);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
