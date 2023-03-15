/* eslint-disable node/no-unsupported-features/es-syntax */
const Subreddit = require("../model/subredditModel");

exports.getAllSubreddits = async (req, res) => {
  try {
    if (!req && !res) return await Subreddit.find();

    const searchQueries = { ...req.query };
    let queryStr = JSON.stringify(searchQueries);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const subreddits = await Subreddit.find(JSON.parse(queryStr));
    res.status(200).json({
      requestTime: req.requestTime,
      status: "success",
      data: {
        subreddits,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createSubredditEntry = async (req, res) => {
  try {
    const subreddit = await Subreddit.create(req.body);
    res.status(201).json({
      requestTime: req.requestTime,
      status: "success",
      data: subreddit,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.deleteSubredditEntry = async (req, res) => {
  try {
    const { id } = req.params;
    await Subreddit.findByIdAndDelete(id);
    res.status(204).json({
      requestTime: req.requestTime,
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.clearAllSubredditEntries = async (req, res) => {
  try {
    await Subreddit.deleteMany({});
    res.status(204).json({
      requestTime: req.requestTime,
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
