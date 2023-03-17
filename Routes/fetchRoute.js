const express = require("express");
const controller = require("../controllers/fetchController");

const router = express.Router();
router
  .route("/")
  .post(controller.fetchData)
  .delete(controller.clearDuplicateResults);
module.exports = router;
