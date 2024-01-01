import express from 'express'
import { tokenValidate } from '../middleware/authMiddleware'
import * as userRouter from './userRouter'
import * as orderRouter from './orderRouter'
import * as itemRouter from './itemRouter'
import * as shopRouter from './shopRouter'
import * as wishlistRouter from './wishlistRouter'
import * as communityRouter from './communityRouter'
import * as ticketRouter from "./ticketRouter"
import * as categoryRouter from './categoryRouter'
import * as imageGenRouter from './imageGenRouter'

const router = express.Router()

//user routes
router.post("/api/users/login", userRouter.login)
router.post("/api/users/signup", userRouter.signup)
router.get("/api/users/profile", tokenValidate, userRouter.getProfile)
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
router.delete("/api/shop/removeReview", tokenValidate,shopRouter.removeReview)
router.get("/api/shop/getReviews", tokenValidate, shopRouter.getShopReviews)
router.get("/api/shop/pendingShops", tokenValidate,shopRouter.pendingShops)
router.put("/api/shop/approveShop/:shopId", tokenValidate,shopRouter.approveShop)
router.get("/api/shop/getUserShops/:userId", tokenValidate,shopRouter.getUserShops)
router.get("/api/shop/recommended", tokenValidate, shopRouter.getRecommendedShops)

//item routes
router.post("/api/items/addItem/:shopId", tokenValidate,itemRouter.addItem)
router.put("/api/items/update/:itemId", tokenValidate,itemRouter.updateItem)
router.delete("/api/items/deleteItem/:itemId", tokenValidate,itemRouter.deleteItem)
router.get("/api/items/getItem/:itemId", tokenValidate,itemRouter.getItem)
router.get("/api/items/getReviews/:itemId", tokenValidate,itemRouter.getReviews)
router.post("/api/items/addReview/:itemId", tokenValidate,itemRouter.addReview)
router.delete("/api/items/removeReview/:reviewId",tokenValidate,itemRouter.removeReview)
router.get("/api/items/search", tokenValidate,itemRouter.searchItem)
router.get("/api/items/getByShop/:shopId", tokenValidate,itemRouter.getByShop)
router.get("/api/item/getRandomItems", tokenValidate,itemRouter.getRandomItems)
router.get("/api/items/getByCategory/:categoryId", tokenValidate,itemRouter.getbyCategory)

//order routes
router.post("/api/orders/place", tokenValidate,orderRouter.placeOrder)
router.get("/api/orders/shop/:shopId", tokenValidate,orderRouter.getOrderForShopId)
router.get("/api/orders/user/:userId",tokenValidate, orderRouter.getOrderForUserId)

//community routes
router.post("/api/community/addPost", tokenValidate, communityRouter.addPost)
router.post("/api/community/comment/:postId", tokenValidate, communityRouter.addCommentOnPost)
router.get("/api/community/posts", tokenValidate, communityRouter.getPosts)
router.get("/api/community/comments/:postId", tokenValidate, communityRouter.getCommentsByPostId)
router.get("api/community/resolve/:postId", tokenValidate, communityRouter.resolvePost)
router.get("/api/community/vote/:voteType", tokenValidate, communityRouter.votePost)
router.delete("/api/community/deletePost/:postId", tokenValidate, communityRouter.deletePost)
router.put("/api/community/updatePost/:postId", tokenValidate, communityRouter.editPost)
router.post("/api/community/addlike/:postId", tokenValidate,communityRouter.LikePost)
router.delete("/api/community/removeLike/:postId", tokenValidate,communityRouter.removeLikePost)
router.get("/api/community/getLikedPosts", tokenValidate,communityRouter.getLikedPosts)
router.get("/api/community/myposts/", tokenValidate, communityRouter.getPostsForUserId)

//wishlist routes
router.post("/api/wishlist/add/:itemId", tokenValidate,wishlistRouter.addToWishList)
router.delete("/api/wishlist/delete/:itemId", tokenValidate,wishlistRouter.removeFromWishList)
router.get("/api/wishlist/get/:data", tokenValidate,wishlistRouter.getWishList)


// Category routes 
router.get("/api/category/get", tokenValidate,categoryRouter.getAllCategories)
router.post("/api/category/add",tokenValidate, categoryRouter.addCategory)
router.delete("/api/category/delete",tokenValidate,categoryRouter.deleteCategory)
router.get("/api/category/getRandom",tokenValidate,categoryRouter.randomCategory)

//ticket routes
router.get("/api/ticket/getTickets" , tokenValidate , ticketRouter.getTickets)
router.get("/api/ticket/getTicket/:ticketId",tokenValidate,ticketRouter.getTicketById)
router.post("/api/ticket/submitTicket" , tokenValidate , ticketRouter.submitTicket)
router.get("/api/ticket/resolve/:ticketId",tokenValidate ,ticketRouter.resolveTicket)

//AI
router.post("/api/ai/generate", imageGenRouter.generateImage)

export {router}
