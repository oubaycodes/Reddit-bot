/* eslint-disable no-sequences */
const redditClient = require("../model/redditClient");

exports.getNewPosts = async function (req, res) {
  try {
    const subName = req.params.sub;
    const { limit } = +req.query;
    const posts = await redditClient.getNew(subName, { limit: limit || 10 });

    const postsObj = posts.map((post) => ({
      title: post.title,
      subName: post.subreddit_name_prefixed,
      score: post.score,
      thumbnail: post.thumbnail,
      isNsfw: post.over_18,
      url: post.url,
    }));

    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      length: posts.length,
      data: postsObj,
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
    const { limit } = +req.query;
    const posts = await redditClient.getHot(subName, { limit: limit || 10 });
    const postsObj = posts.map((post) => ({
      title: post.title,
      subName: post.subreddit_name_prefixed,
      score: post.score,
      thumbnail: post.thumbnail,
      isNsfw: post.over_18,
      url: post.url,
    }));

    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      length: posts.length,
      data: postsObj,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};
