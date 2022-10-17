/* eslint-disable no-console */
const dotenv = require("dotenv");
const Snoowrap = require("snoowrap");

dotenv.config({ path: "./config.env" });
// running app
const app = require("./app");

const client = new Snoowrap({
  userAgent: "reddit-bot-example-node",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS,
});
const port = +process.env.PORT;

app.listen(port, () => {
  console.log("App is running");
});
