const express = require("express");
const controller = require("../controllers/subredditController");

const router = express.Router();
router
  .route("/")
  .get(controller.getAllSubreddits)
  .post(controller.createSubredditEntry)
  .delete(controller.clearAllSubredditEntries);

router.route("/:id").delete(controller.deleteSubredditEntry);
module.exports = router;
