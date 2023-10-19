import express from 'express'
import { tokenValidate } from '../middleware/authMiddleware'
import * as userRouter from './userRouter'
import * as orderRouter from './orderRouter'
import * as itemRouter from './itemRouter'
import * as shopRouter from './shopRouter'
import * as communityRouter from './communityRouter'

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
router.get("/api/shop/search" , tokenValidate,shopRouter.searchShop)
router.post("/api/shop/addReview", tokenValidate,shopRouter.addReview)
router.delete("api/shop/removeReview", tokenValidate,shopRouter.removeReview)
router.get("api/shop/getReviews", tokenValidate, shopRouter.getShopReviews)
router.get("api/shop/pendingShops", tokenValidate,shopRouter.pendingShops)
router.put("api/shop/approveShop", tokenValidate,shopRouter.approveShop)

//item Routes
router.post("/api/items/addItem",tokenValidate,itemRouter.addItem)
router.put("/api/items/updateItem/:itemId",tokenValidate,itemRouter.updateItem)
router.delete("/api/items/deleteItem/:itemId",tokenValidate,itemRouter.deleteItem)
router.get("/api/items/getItem/:itemId",tokenValidate,itemRouter.getItem)
router.get("/api/items/getReviews/:itemId" , tokenValidate,itemRouter.getReviews)
router.post("/api/items/addReview/:itemId",tokenValidate,itemRouter.addReview)
router.delete("/api/items/removeReview/:reviewId",tokenValidate,itemRouter.removeReview)
router.get("/api/items/search" , tokenValidate,itemRouter.searchItem)
router.get("/api/items/getByShop/:shopId" , tokenValidate,itemRouter.getByShop)
router.get("/api/item/getRandomItems"),tokenValidate,itemRouter.getRandomItems

//order routes
router.post("/api/orders/place", tokenValidate,orderRouter.placeOrder)
router.get("/api/orders/shop/:shopId", tokenValidate,orderRouter.getOrderForShopId)
router.get("/api/orders/user/:userId",tokenValidate, orderRouter.getOrderForUserId)

//community routes
router.post("/api/community/addPost", tokenValidate, communityRouter.addPost)
router.post("/api/community/comment/:postId", tokenValidate, communityRouter.addCommentOnPost)
router.get("/api/community/posts", tokenValidate, communityRouter.getPosts)
router.get("api/community/resolve/:postId", tokenValidate, communityRouter.resolvePost)
router.get("/api/community/vote/:voteType", tokenValidate, communityRouter.votePost)
router.delete("/api/community/deletePost/:postId", tokenValidate, communityRouter.deletePost)
router.put("/api/community/updatePost/:postId", tokenValidate, communityRouter.updatePost)

export {router}