const express = require("express");
const morgan = require("morgan");

if (process.env.DEVELOPMENT) morgan("dev");
// create app
const app = express();

module.exports = app;
