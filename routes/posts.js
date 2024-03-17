const express = require("express");
const postController = require("../controller/post.controller");
const CheckAuthMiddleware = require("../middleware/check-auth")

const router = express.Router();

router.post("/", CheckAuthMiddleware.CheckAuth,postController.savePost);
router.get("/", CheckAuthMiddleware.CheckAuth, postController.getAllPosts);
router.get("/:id", CheckAuthMiddleware.CheckAuth,postController.getPost);
router.patch("/:id", CheckAuthMiddleware.CheckAuth,postController.updatePost);
router.delete("/:id", CheckAuthMiddleware.CheckAuth,postController.deletePost);

module.exports = router;