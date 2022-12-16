/* eslint-disable no-console */
const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./modules/connectDB");
const subredditController = require("./controllers/subredditController");

// create app
const app = express();
dotenv.config({ path: "./config.env" });

// Database

(async () => {
  await connectDatabase();
  // await subredditController.createSubredditEntry({
  //   subredditName: "oddlysatisfying",
  //   isNsfw: false,
  // });
  // await subredditController.clearSubreddits();
  const subreddits = await subredditController.getAllSubreddits();
  console.log(subreddits);
})();

module.exports = app;
