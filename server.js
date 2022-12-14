/* eslint-disable no-console */
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
// running app
const app = require("./app");

const port = +process.env.PORT;

app.listen(port, () => {
  try {
    console.log("App is running.....");
  } catch (err) {
    console.error("Server cannot be reached, try again in a few seconds");
    process.exit();
  }
});
