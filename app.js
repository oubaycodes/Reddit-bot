/* eslint-disable no-plusplus */
/* eslint-disable no-console */

const fs = require("fs/promises");
const dotenv = require("dotenv");
const connectDatabase = require("./modules/connectDB");
const subredditController = require("./controllers/subredditController");
// create app
dotenv.config({ path: "./config.env" });
const postController = require("./controllers/postController");

// Database

(async () => {
  await connectDatabase();

  const subreddits = await subredditController.getAllSubreddits();
  const fetchData = async function () {
    const posts = [];
    for (let i = 1; i <= process.env.FETCHES; i++) {
      subreddits.forEach(async (sub) => {
        const hotList = await postController.getHotPosts(
          sub.subredditName,
          Math.floor((Math.random() + process.env.MINIMUM) * +process.env.LIMIT)
        );
        // add variables for new limit
        const newList = await postController.getHotPosts(
          sub.subredditName,
          Math.floor(
            (Math.random() + (process.env.MINIMUM - 6)) *
              (+process.env.LIMIT - 11)
          )
        );
        const dataArr = hotList.concat(newList);
        posts.push(dataArr);
        // testing
        fs.writeFile("./log.json", JSON.stringify(dataArr));
      });
    }
    return posts;
  };
  // fix data return todo
  console.log(await fetchData());
})();
