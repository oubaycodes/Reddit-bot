/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
// const fs = require("fs/promises");
const express = require("express");

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// Routes
const subredditRoute = require("./Routes/subredditRoute");
// const fetchRoute = require("./Routes/fetchRoute");
// const dataRoute = require("./Routes/dataRoute");

app.use(`/api/v1/subreddits`, subredditRoute);
// app.use(`${process.env.URL}/fetch`, fetchRoute);
// app.use(`${process.env.URL}/posts`, dataRoute);

// const subredditController = require("./controllers/subredditController");
// // create app
// const postController = require("./controllers/postController");
// const Url = require("./model/urlModel");

// Database

// (async () => {
//   try {
//     const subreddits = await subredditController.getAllSubreddits();

//     // eslint-disable-next-line no-unused-vars
//     const data = await Promise.all(
//       subreddits.map(async (sub) => {
//         const hotList = await postController.getHotPosts(
//           sub.subredditName,
//           Math.floor((Math.random() + process.env.MINIMUM) * +process.env.LIMIT)
//         );
//         // add variables for new limit
//         const newList = await postController.getHotPosts(
//           sub.subredditName,
//           Math.floor(
//             (Math.random() + (+process.env.MINIMUM - 6)) *
//               (+process.env.LIMIT - 11)
//           )
//         );
//         let dataArr = Array.from(hotList.concat(Array.from(newList)));
//         dataArr = new Set(dataArr);
//         dataArr = Array.from(dataArr);
//         return dataArr;
//       })
//     );
//     // await fs.writeFile("./log.json", JSON.stringify(data));

//     await Url.create(data[0]);
//     const docNum = await Url.countDocuments();
//     console.log(docNum);
//   } catch (err) {
//     console.log(err);
//   }
// })();
module.exports = app;
