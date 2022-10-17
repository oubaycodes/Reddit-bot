const redditClient = require("../model/redditClient");

exports.getHundredNewestPosts = async function (req, res) {
  try {
    const subName = req.params.sub;
    const posts = await redditClient.getNew(subName, { limit: 2 });
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};
