/* eslint-disable node/no-extraneous-require */
const express = require("express");
const dotenv = require("dotenv");
const timeout = require("express-timeout-handler");

const app = express();
dotenv.config({ path: "./config.env" });

// Middleware
app.use(express.json());
app.use(
  timeout.handler({
    timeout: 10000, // 10 seconds
  })
);
app.use((err, req, res, next) => {
  if (err.name === "TimeoutError") {
    res.status(404).send("Request Timeout");
  }
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// Routes
const subredditRoute = require("./Routes/subredditRoute");
const fetchRoute = require("./Routes/fetchRoute");
const urlRoute = require("./Routes/urlRoute");

app.use(`/api/v1/subreddits`, subredditRoute);
app.use(`/api/v1/fetch`, fetchRoute);
app.use(`/api/v1/urls`, urlRoute);

module.exports = app;
// add random generator
