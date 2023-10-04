const express = require("express")
const router = express.Router()
const { tokenValidate } = require("../middleware/authMiddleware")
const userRouter = require("./userRouter")


//user Routes
router.post("/api/users/login", userRouter.login)
router.post("/api/users/signup", userRouter.signup)
router.get("/api/users/getUser/:id", tokenValidate, userRouter.getUser)
router.put("/api/users/editUser/:id", tokenValidate, userRouter.editUser)
router.delete("/api/users/deleteUser/:id", tokenValidate, userRouter.deleteUser)

module.exports = router