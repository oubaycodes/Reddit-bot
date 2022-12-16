/* eslint-disable no-console */
const mongoose = require("mongoose");

const connectDatabase = async function () {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  mongoose.set("strictQuery", false);
  // eslint-disable-next-line no-unused-vars
  const connection = await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connection established.......");
};
module.exports = connectDatabase;
