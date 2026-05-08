const express = require("express");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");

const app = express();

app.use(express.json());
app.set("query parser", "extended");

app.use("/api/Products", productRouter);
app.use("/api/Cart", cartRouter);

module.exports = app;
