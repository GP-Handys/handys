const express = require("express")
const router = express.Router()
const { tokenValidate } = require("../middleware/authMiddleware")
const { login , signup , logout} = require("./userController")


//auth Routes
router.post("/login",login)
router.post("/signup",signup)
router.post("/logout",logout)

router.get("/",tokenValidate,test)

function test(){
    console.log("dsfdsfssdf");
}

module.exports = router