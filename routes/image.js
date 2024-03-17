const express = require('express');
const imageController = require("../controller/image.controller");
const CheckAuthMiddleware = require("../middleware/check-auth");
const imageUploader = require("../helpers/image-uploader");

const router = express.Router();

router.post("/upload", CheckAuthMiddleware.CheckAuth, imageUploader.upload.single('image'), imageController.upload);

module.exports = router;