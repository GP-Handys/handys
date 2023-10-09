import { Request, Response } from "express";
import * as dotenv from 'dotenv';
import { User } from '../models/User'
import { extractUserFromJwt } from '../utils/tokenUtils';
import { Shop } from "../models/Shop";
dotenv.config();

export const createShop = async (req: Request, res: Response) => {
   try {
      const { name, pfp_url, bio, socialMediaLink } = req.body;
      const jwt: string = req.get("Authorization")?.toString()!
      const userId = extractUserFromJwt(jwt)

      await Shop.create({ name, pfp_url, bio, socialMediaLink, userId })

      res.status(200).json("Shop is created")
   }
   catch (error) {
      res.status(500).json(error)
   }
}

export const updateShop = async (req: Request, res: Response) => {
   try {
      const { name, pfp_url, bio, socialMediaLink, shopId } = req.body;
      const jwt: string = req.get("Authorization")?.toString()!
      const userId = extractUserFromJwt(jwt)

      const user = await User.findByPk(userId);
      const shop = await Shop.findByPk(shopId)

      if (user?.is_sys_admin || shop?.userId == userId) {
         await Shop.update({ name, pfp_url, bio, socialMediaLink }, {
            where: {
               id: shopId
            }
         })

         res.status(200).json("Shop is updated")
      }
      else {
         res.sendStatus(403)
      }
   }
   catch (error) {
      res.status(500).json(error)
   }

}

export const deleteShop = async (req: Request, res: Response) => {
   try {
      const jwt: string = req.get("Authorization")?.toString()!
      const userId = extractUserFromJwt(jwt)
      const shopId = req.params.shopId
      const user = await User.findByPk(userId);
      const shop = await Shop.findByPk(shopId)

      if (user?.is_sys_admin || shop?.userId == userId) {
         await shop?.destroy()
         res.status(200).json("Shop is deleted")
      }
      else {
         res.sendStatus(403)
      }
   }
   catch (error) {
      res.status(500).json(error)
   }

}

export const getShop = async (req: Request, res: Response) => {
   try {
      const shopId = req.params.shopId

      const shop = await Shop.findByPk(shopId)

      if (shop == null) {
         res.sendStatus(404);
         return;
      }

      res.sendStatus(200).json(shop)

   } catch (error) {
      res.status(500).json(error)
   }

}


