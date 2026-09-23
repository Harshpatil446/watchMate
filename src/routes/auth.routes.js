const express = require("express")
const authContoller = require("../controllers/auth.contrller")
const router = express.Router()

router.post("/register", authContoller.registerUser)

module.exports = router