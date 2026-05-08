const Product = require("./../models/productModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllProducts = async function (req, res) {
  try {
    const page = Number(req.query.page || 1);
    const limit = 10;

    const features = new APIFeatures(Product.find(), req.query).filter().sort().paginate();
    const [products, totalDocs] = await Promise.all([
      features.query,
      Product.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalDocs / limit) || 1;

    res.status(200).json({
      status: "success",
      payload: products,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getProduct = async function (req, res) {
  try {
    const product = await Product.findById(req.params.pid);
    if (!product) return res.status(404).json({ status: "error", message: "Product not found" });
    res.status(200).json({ status: "success", payload: product });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.createProduct = async function (req, res) {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ status: "created", payload: newProduct });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.updateProduct = async function (req, res) {
  try {
    const updateData = { ...req.body };
    delete updateData._id;

    const product = await Product.findByIdAndUpdate(req.params.pid, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) return res.status(404).json({ status: "error", message: "Product not found" });

    res.status(200).json({ status: "success", payload: product });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.deleteProduct = async function (req, res) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.pid);
    if (!deletedProduct) return res.status(404).json({ status: "error", message: "Product not found" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
