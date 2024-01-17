import { Request, Response } from "express";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { Cart } from "../models/Cart";
import { Item } from "../models/Item";
import { connection as DB } from "../database/database";

export const addToCart = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);
  const itemId = req.params.itemId;
  const { customization } = req.body;
  let canAddToCard = true;

  try {
    let shopId = (await Item.findByPk(itemId))?.shopId;
    let cartItems: Cart[] = await Cart.findAll({
      where: {
        user_id: userId,
      },
    });
    if (cartItems.length > 0) {
      cartItems.forEach((cartItem) => {
        if (cartItem.shop_id != shopId) {
          canAddToCard = false;
        }
      });
    }
    if (!canAddToCard) {
      res
        .status(400)
        .json("You can't add items from different shops to the cart");
      return;
    }

    let cartItem = await Cart.findOne({
      where: {
        item_id: itemId,
        shop_id: shopId,
        user_id: userId,
        customization: customization,
      },
    });
    if (cartItem == null) {
      await Cart.create({
        item_id: itemId,
        user_id: userId,
        shop_id: shopId,
        customization: customization,
      });
    } else {
      await Cart.update(
        { quantity: cartItem.quantity + 1 },
        { where: { id: cartItem.id } }
      );
    }
    res.status(201).json("Item added to cart");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const updateQuantity = async (req: Request, res: Response) => {
  const cartId = parseInt(req.params.cartId);
  const quantity = parseInt(req.params.quantity);
  try {
    await Cart.update({ quantity: quantity }, { where: { id: cartId } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const cartId = req.params.cartId;
  try {
    await Cart.destroy({
      where: {
        id: cartId,
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
    let cart = await Cart.findAll({ where: { user_id: user_id } });
    let query = `select * from items where id = (select item_id from carts where user_id = ${user_id} and item_id=items.id limit 1);`;
    const items = (await DB.query(query)) as Item[];

    let itemsMap: any = {};
    items[0].forEach((element) => {
      itemsMap[element.id] = element;
    });

    res.status(200).json([cart, itemsMap]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const user_id: number = extractUserFromJwt(jwt);

  try {
    await Cart.destroy({ where: { user_id: user_id } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};
