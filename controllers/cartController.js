const Cart = require("./../models/cartModel");

exports.createCart = async function (req, res) {
  try {
    const cart = await Cart.create({ products: [] });
    res.status(201).json({ status: "created", payload: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getCart = async function (req, res) {
  try {
    const cart = await Cart.findById(req.params.cid).populate("products.product");
    if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });
    res.status(200).json({ status: "success", payload: cart.products });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.addProductToCart = async function (req, res) {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

    const existing = cart.products.find((item) => item.product.toString() === pid);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.deleteProductFromCart = async function (req, res) {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

    cart.products = cart.products.filter((item) => item.product.toString() !== pid);
    await cart.save();
    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.updateCartProducts = async function (req, res) {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = await Cart.findByIdAndUpdate(cid, { products }, { new: true, runValidators: true });
    if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });
    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.updateProductQuantity = async function (req, res) {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

    const existing = cart.products.find((item) => item.product.toString() === pid);
    if (!existing) return res.status(404).json({ status: "error", message: "Product not in cart" });

    existing.quantity = quantity;
    await cart.save();

    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.clearCart = async function (req, res) {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

    cart.products = [];
    await cart.save();
    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
