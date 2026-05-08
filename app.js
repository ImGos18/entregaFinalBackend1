const express = require("express");
const Product = require("./models/productModel");
const Cart = require("./models/cartModel");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");

const app = express();

app.use(express.json());
app.set("query parser", "extended");

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.get("/products", async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find().skip(skip).limit(limit),
    Product.countDocuments(),
  ]);

  res.status(200).json({
    page,
    totalPages: Math.ceil(total / limit) || 1,
    products,
  });
});

app.get("/products/:pid", async (req, res) => {
  const product = await Product.findById(req.params.pid);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.status(200).json({ product, addToCartEndpoint: `/api/carts/:cid/products/${product._id}` });
});

app.get("/carts/:cid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid).populate("products.product");
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  res.status(200).json({ cart });
});

module.exports = app;
