const express = require('express');
const passport = require('passport');
const router = express.Router();

const controller = require('../../controllers/post.controller');

router.get("/",controller.listPosts);

router.post("/",passport.authenticate('jwt',{ session: false }),controller.addPost);

module.exports = router;