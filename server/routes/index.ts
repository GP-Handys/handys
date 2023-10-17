import express from 'express'
import { tokenValidate } from '../middleware/authMiddleware'
import * as userRouter from './userRouter'
import * as orderRouter from './orderRouter'
import * as itemRouter from './itemRouter'
import * as shopRouter from './shopRouter'

const router = express.Router()

//user Routes
router.post("/api/users/login", userRouter.login)
router.post("/api/users/signup", userRouter.signup)
router.get("/api/users/getUser/:id", tokenValidate, userRouter.getUser)
router.put("/api/users/updateUser/:id", tokenValidate, userRouter.updateUser)
router.delete("/api/users/deleteUser/:id", tokenValidate, userRouter.deleteUser)

//shop routes
router.post("/api/shop/create", tokenValidate,shopRouter.createShop)
router.get("/api/shop/read/:shopId", tokenValidate,shopRouter.getShop)
router.put("/api/shop/update/:shopId", tokenValidate,shopRouter.updateShop)
router.delete("/api/shop/delete/:shopId", tokenValidate,shopRouter.deleteShop)

//item Routes
router.post("/api/items/addItem",tokenValidate,itemRouter.addItem)
router.put("/api/items/updateItem/:itemId",tokenValidate,itemRouter.updateItem)
router.delete("/api/items/deleteItem/:itemId",tokenValidate,itemRouter.deleteItem)
router.get("/api/items/getItem/:itemId",tokenValidate,itemRouter.getItem)
router.post("/api/items/addReviewToItem/:itemId",tokenValidate,itemRouter.addReviewToItem)
router.post("/api/items/removeReviewFormItem/:reviewId",tokenValidate,itemRouter.removeReviewFromItem)
router.get("/api/items/search" , tokenValidate,itemRouter.searchItem)

//order routes
router.post("/api/orders/place", tokenValidate,orderRouter.placeOrder)
router.get("/api/orders/shop/:shopId", tokenValidate,orderRouter.getOrderForShopId)
router.get("/api/orders/user/:userId",tokenValidate, orderRouter.getOrderForUserId)

export {router}