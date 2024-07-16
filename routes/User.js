const express = require("express")
const {registerUser, authUser, getUserProfile} = require("../controllers/User")
const router = express.Router()

router.post("/", registerUser)
router.post("/login", authUser)
router.get("/userProfile", getUserProfile)


module.exports = router