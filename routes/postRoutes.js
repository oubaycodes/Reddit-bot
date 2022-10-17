const express = require("express");
const controller = require("../controllers/postController");

const router = express.Router();
router.route("/:sub").get(controller.getHundredNewestPosts);

module.exports = router;
