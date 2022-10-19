const express = require("express");
const controller = require("../controllers/postController");

const router = express.Router();
router.route("/new/:sub").get(controller.getNewPosts);
router.route("/hot/:sub").get(controller.getHotPosts);

module.exports = router;
