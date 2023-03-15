const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config({ path: "./config.env" });

// Middleware
app.use(express.json());
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
app.use(`/api/v1/posts`, urlRoute);

module.exports = app;
