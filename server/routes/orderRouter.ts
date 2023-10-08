const Order = require("../models/Order")
const Item = require("../models/Item")
import { Request, Response } from 'express';

export const placeOrder = async (req: Request, res: Response) => {
    try {
        const {
            delivery_address,
            payment_method,
            price,
            is_confirmed,
            userId,
            shopId,
            items
        } = req.body;

        const order = await Order.create({
            deliver_address: delivery_address,
            payment_method: payment_method,
            price: price,
            is_confirmed: is_confirmed,
            userId: userId,
            shopId: shopId,
        });

        if (items && items.length > 0) {
            for (const itemData of items) {
                const { itemId, quantity } = itemData;

                const item = await Item.findByPk(itemId);

                if (!item) {
                    return res.status(400).json({ error: `Item with ID ${itemId} not found` });
                }

                // add to item_orders joint table
                await order.addItem(item, { through: { quantity } });
            }
        }

        // 201 = resource created. better convention :)
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error })
    }
}

export const getOrderForShopId = async (req: Request, res: Response) => {
    const shopId = req.params.shopId

    try {
        const orders = await Order.findAll({
            where: {
                shopId: shopId
            }
        })

        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}

export const getOrderForUserId = async (req: Request, res: Response) => {
    const userId = req.params.userId

    try {
        const orders = await Order.findAll({
            userId: userId
        })

        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}