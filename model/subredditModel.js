const mongoose = require("mongoose");

const subredditSchema = new mongoose.Schema({
  subredditName: {
    type: String,
    required: [true, "Subreddit name is required"],
    trim: true,
    unique: true,
  },
  isNSFW: {
    type: Boolean,
    required: [true, "Navigation Safety is required"],
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const subredditModel = mongoose.model("Subreddits", subredditSchema);

module.exports = subredditModel;
