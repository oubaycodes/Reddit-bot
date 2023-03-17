const fs = require("fs/promises");
const postController = require("./postController");
const Url = require("../model/urlModel");
const subredditController = require("./subredditController");

exports.fetchData = async (req, res) => {
  try {
    const subreddits = await subredditController.getAllSubreddits();
    if (!subreddits) throw new Error("No subreddits were found!");
    const data = await Promise.all(
      subreddits.map(async (sub) => {
        const hotList = await postController.getHotPosts(
          sub.subredditName,
          Math.floor((Math.random() + process.env.MINIMUM) * +process.env.LIMIT)
        );

        const newList = await postController.getNewPosts(
          sub.subredditName,
          Math.floor(
            (Math.random() + (+process.env.MINIMUM - 6)) *
              (+process.env.LIMIT - 11)
          )
        );
        let dataArr = Array.from(hotList.concat(Array.from(newList)));
        dataArr = Array.from(dataArr);
        return dataArr;
      })
    );

    if (process.env.LOG)
      await fs.writeFile("./log.json", JSON.stringify(data.flat(1)));
    await Url.create(data);
    const docNum = await Url.countDocuments();
    res.status(201).json({
      requestTime: req.requestTime,
      status: "success",
      documentAmount: docNum,
    });
  } catch (err) {
    const docNum = await Url.countDocuments();
    res.status(404).json({
      documentAmount: docNum,
      requestTime: req.requestTime,
      status: "fail",
      message: err.message,
    });
  }
};
