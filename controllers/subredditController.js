const Subreddit = require("../model/subredditModel");

exports.getAllSubreddits = async () => {
  let subreddits = Subreddit.find();
  subreddits = subreddits.select("-__v");
  return await subreddits;
};
// testing only

// exports.createSubredditEntry = async function (dataBody) {
//   return Subreddit.create(dataBody);
// };
// exports.clearSubreddits = async () => {
//   await Subreddit.deleteMany({});
// };
