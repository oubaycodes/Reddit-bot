const express = require("express");
const morgan = require("morgan");

// create app
const app = express();

// middleware
if (process.env.DEVELOPMENT) app.use(morgan("dev"));

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
const postRoute = require("./routes/postRoutes");

// Resources
app.use("/api/v1/posts", postRoute);

module.exports = app;
