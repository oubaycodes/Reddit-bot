const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  subName: {
    type: String,
    trim: true,
    required: [true, "Subreddit name is required"],
  },
  score: {
    type: Number,
    required: [true, "Score is required"],
  },
  thumbnail: {
    type: String,
    required: [true, "thumbnail is required"],
    trim: true,
  },
  isNsfw: {
    type: Boolean,
    required: [true, "Navigation Safety is required"],
    default: false,
  },
  url: {
    type: String,
    required: [true, "thumbnail is required"],
    trim: true,
  },
});
const urlModel = mongoose.model("Urls", urlSchema);
module.exports = urlModel;
