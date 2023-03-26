const express = require("express");
const controller = require("../controllers/urlController");

const urlRouter = express.Router();
const randomRouter = express.Router({ mergeParams: true });
urlRouter.use("/random", randomRouter);
randomRouter.get("/", controller.getRandom);
urlRouter
  .route("/")
  .get(controller.getAllUrls)
  .delete(controller.clearAllUrlEntries);
urlRouter
  .route("/:id")
  .get(controller.getUrlEntry)
  .delete(controller.deleteUrlEntry);

module.exports = urlRouter;
