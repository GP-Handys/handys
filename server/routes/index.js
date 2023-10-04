const express = require("express")
const router = express.Router()
const { tokenValidate } = require("../middleware/authMiddleware")
const userRouter = require("./userRouter")
const itemRouter = require("./itemRouter")


//user Routes
router.post("/api/users/login", userRouter.login)
router.post("/api/users/signup", userRouter.signup)
router.get("/api/users/getUser/:id", tokenValidate, userRouter.getUser)
router.put("/api/users/editUser/:id", tokenValidate, userRouter.updateUser)
router.delete("/api/users/deleteUser/:id", tokenValidate, userRouter.deleteUser)

//item Routes
router.post("/api/items/addItem",tokenValidate,itemRouter.addItem)
router.put("/api/items/updateItem/:itemID",tokenValidate,itemRouter.updateItem)
router.delete("/api/items/deleteItem/:itemID",tokenValidate,itemRouter.deleteItem)
router.get("/api/items/getItem/:itemID",tokenValidate,itemRouter.getItem)
router.post("/api/items/addReviewToItem/:itemID",tokenValidate)
router.post("/api/items/search",tokenValidate)

module.exports = router