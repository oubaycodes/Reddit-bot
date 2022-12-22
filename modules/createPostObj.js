const createPostObj = (posts) => {
  const postsObj = posts.map((post) => ({
    title: post.title,
    subName: post.subreddit_name_prefixed,
    score: post.score,
    thumbnail: post.thumbnail,
    isNsfw: post.over_18,
    url: post.url,
  }));
  return postsObj;
};
module.exports = createPostObj;
