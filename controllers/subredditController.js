/* eslint-disable node/no-unsupported-features/es-syntax */
const Subreddit = require("../model/subredditModel");
const urlController = require("./urlController");
const APIfeatures = require("../modules/apiFeatures");

exports.getAllSubreddits = async (req = null, res = null) => {
  try {
    if (!req && !res) return await Subreddit.find();

    const subredditFeatures = new APIfeatures(Subreddit.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();
    const subreddits = await subredditFeatures.query;
    res.status(200).json({
      requestTime: req.requestTime,
      page: subredditFeatures.page,
      results: subreddits.length,
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
exports.getSubredditEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const subreddit = await Subreddit.findById(id);
    res.status(200).json({
      requestTime: req.requestTime,
      status: "success",
      data: {
        subreddit,
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
    urlController.clearAllUrlEntries();
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
