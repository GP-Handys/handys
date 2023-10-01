const express = require("express")
const router = express.Router()
const { tokenValidate } = require("../middleware/authMiddleware")
const { login , signup } = require("./userRouter")


//auth Routes
router.post("/login",login)
router.post("/signup",signup)

module.exports = router