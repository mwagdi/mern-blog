const express = require("express");
const router = express.Router();

const controller = require("../../controllers/user.controller");

const User = require("../../models/User");

// router.post("/register",(req,res,next))

router.get("/",(req,res,next) => {
    res.json({process: process.env.SECRET});
});

router.post("/register",controller.registerUser);

router.post("/login",controller.loginUser);

module.exports = router;