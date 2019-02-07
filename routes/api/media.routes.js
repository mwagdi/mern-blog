const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("../../controllers/media.controller");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/posts/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
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

router.get("/",controller.listMedia);

router.post("/",upload.array('src'),controller.addMedia);

router.delete("/:id",controller.deleteMedia);

module.exports = router;