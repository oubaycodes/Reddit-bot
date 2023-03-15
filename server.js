/* eslint-disable no-console */
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });
const port = +process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}.....`);
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  mongoose.set("strictQuery", true);
  mongoose.connect(
    DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Database connection established.......");
    }
  );
});
