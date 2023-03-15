/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
// const fs = require("fs/promises");
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
// const dataRoute = require("./Routes/dataRoute");

app.use(`/api/v1/subreddits`, subredditRoute);
app.use(`/api/v1/fetch`, fetchRoute);
// app.use(`/api/v1/posts`, dataRoute);

// Database

module.exports = app;
