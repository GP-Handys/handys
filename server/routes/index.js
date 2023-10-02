const express = require("express")
const router = express.Router()
const { tokenValidate } = require("../middleware/authMiddleware")
const userRouter = require("./userRouter")


//user Routes
router.post("/login", userRouter.login)
router.post("/signup", userRouter.signup)
router.get("/getUser/:id", tokenValidate, userRouter.getUser)
router.post("/editUser/:id", tokenValidate, userRouter.editUser)
router.post("/deleteUser/:id", tokenValidate, userRouter.deleteUser)

module.exports = router