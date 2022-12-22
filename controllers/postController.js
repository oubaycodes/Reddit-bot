/* eslint-disable no-sequences */
const redditClient = require("../model/redditClient");
const createPostObj = require("../modules/createPostObj");

exports.getNewPosts = async function (subName, limit) {
  const posts = await redditClient.getNew(subName, { limit: limit || 10 });
  return createPostObj(posts);
};
exports.getHotPosts = async function (subName, limit) {
  const posts = await redditClient.getHot(subName, { limit: limit || 10 });
  return createPostObj(posts);
};
exports.getTopPosts = async function (subName, limit) {
  const posts = await redditClient.getTop(subName, { limit: limit || 10 });
  return createPostObj(posts);
};
