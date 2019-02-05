const express = require("express");
const passport = require("passport");
const router = express.Router();

const controller = require("../../controllers/user.controller");

const User = require("../../models/User");

// router.post("/register",(req,res,next))

router.get("/",(req,res,next) => {
    res.json({process: process.env.SECRET});
});

router.post("/register",controller.registerUser);

router.post("/login",controller.loginUser);
router.get("/current",passport.authenticate('jwt',{ session: false }),controller.currentUser);

module.exports = router;