const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

const port = 8080;

const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
