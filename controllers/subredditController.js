const Subreddit = require("../model/subredditModel");

exports.getAllSubreddits = async () => {
  const subreddits = await Subreddit.find();
  return subreddits;
};
exports.createSubredditEntry = async function (dataBody) {
  return Subreddit.create(dataBody);
};
exports.clearSubreddits = async () => {
  await Subreddit.deleteMany({});
};
