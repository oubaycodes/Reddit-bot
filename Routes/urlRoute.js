const express = require("express");
const controller = require("../controllers/urlController");

const router = express.Router();
router
  .route("/")
  .get(controller.getAllUrls)
  .delete(controller.clearAllUrlEntries);
router
  .route("/:id")
  .get(controller.getUrlEntry)
  .delete(controller.deleteUrlEntry);
module.exports = router;
