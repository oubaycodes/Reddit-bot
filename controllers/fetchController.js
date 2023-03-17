const fs = require("fs/promises");
const postController = require("./postController");
const Url = require("../model/urlModel");
const subredditController = require("./subredditController");

const clearDuplicateResults = async (req = null, res = null) => {
  try {
    const docAmountBefore = await Url.countDocuments();
    const results = await Url.aggregate([
      {
        $group: {
          _id: { title: "$title", url: "$url" },
          dupes: { $push: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ]);

    const idsToDelete = results.map((result) => result.dupes.shift());
    await Url.deleteMany({ _id: { $in: idsToDelete } });
    const docAmountAfter = await Url.countDocuments();
    const docsDeleted = Math.abs(docAmountBefore - docAmountAfter);
    if (!req && !res) return docsDeleted;
    res.status(200).json({
      requestTime: req.requestTime,
      status: "success",
      docsDeleted,
      results,
    });
  } catch (err) {
    res.status(404).json({
      requestTime: req.requestTime,
      status: "fail",
      message: err.message,
    });
  }
};

// funny code
exports.clearDuplicateResults = clearDuplicateResults;

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

    if (process.env.LOG === "true")
      await fs.writeFile("./log.json", JSON.stringify(data.flat(1)));
    await Url.create(data.flat());
    const removedDuplicates = await clearDuplicateResults();
    const docNum = await Url.countDocuments();

    res.status(201).json({
      requestTime: req.requestTime,
      status: "success",
      documentAmount: docNum,
      removedDuplicates,
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
