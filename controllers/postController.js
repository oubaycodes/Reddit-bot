/* eslint-disable no-sequences */
const redditClient = require("../model/redditClient");

exports.getNewPosts = async function (req, res) {
  try {
    const subName = req.params.sub;
    const posts = await redditClient.getNew(subName, { limit: 2 });

    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      length: posts.length,
      data: posts.map((post) => ({
        title: post.title,
        subName: post.subreddit_name_prefixed,
        score: post.score,
        thumbnail: post.thumbnail,
        isNsfw: post.over_18,
        url: post.url,
      })),
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getHotPosts = async function (req, res) {
  try {
    const subName = req.params.sub;
    const posts = await redditClient.getHot(subName, { limit: 2 });

    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      length: posts.length,
      data: posts.map((post) => ({
        title: post.title,
        subName: post.subreddit_name_prefixed,
        score: post.score,
        thumbnail: post.thumbnail,
        isNsfw: post.over_18,
        url: post.url,
      })),
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};
