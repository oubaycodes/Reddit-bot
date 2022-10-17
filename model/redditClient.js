const Snoowrap = require("snoowrap");

const client = new Snoowrap({
  userAgent: "reddit-bot-example-node",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS,
});
module.exports = client;
