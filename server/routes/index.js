const express = require("express")
const router = express.Router()
const { tokenValidate } = require("../middleware/authMiddleware")
const { login, signup, getUser, editUser, deleteUser } = require("./userRouter")


//user Routes
router.post("/login", login)
router.post("/signup", signup)
router.get("/getUser/:id", tokenValidate, getUser)
router.post("/editUser/:id", tokenValidate, editUser)
router.post("/deleteUser/:id", tokenValidate, deleteUser)

module.exports = router