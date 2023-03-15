const fs = require("fs/promises");
const postController = require("./postController");
const Url = require("../model/urlModel");
const subredditController = require("./subredditController");

exports.fetchData = async (req, res) => {
  try {
    const subreddits = await subredditController.getAllSubreddits();
    // eslint-disable-next-line no-unused-vars
    const data = await Promise.all(
      subreddits.map(async (sub) => {
        const hotList = await postController.getHotPosts(
          sub.subredditName,
          Math.floor((Math.random() + process.env.MINIMUM) * +process.env.LIMIT)
        );
        // add variables for new limit
        const newList = await postController.getNewPosts(
          sub.subredditName,
          Math.floor(
            (Math.random() + (+process.env.MINIMUM - 6)) *
              (+process.env.LIMIT - 11)
          )
        );
        let dataArr = Array.from(hotList.concat(Array.from(newList)));
        dataArr = new Set(dataArr);
        dataArr = Array.from(dataArr);
        return dataArr;
      })
    );
    await fs.writeFile("./log.json", JSON.stringify(data));
    await Url.create(data[0]);
    const docNum = await Url.countDocuments();
    res.status(201).json({
      requestTime: req.requestTime,
      status: "success",
      documentAmount: docNum,
    });
  } catch (err) {
    res.status(404).json({
      requestTime: req.requestTime,
      status: "fail",
      message: err.message,
    });
  }
};
