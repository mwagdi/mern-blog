const express = require("express");
const passport = require("passport");
const multer = require("multer");
const router = express.Router();

const controller = require("../../controllers/user.controller");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profiles/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + Date.now() + '.jpg');
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/",controller.listUsers);

router.post("/register",upload.single('avatar'),controller.registerUser);

router.post("/login",controller.loginUser);

router.get("/current",passport.authenticate('jwt',{ session: false }),controller.currentUser);

module.exports = router;