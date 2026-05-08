const Product = require("./../models/productModel");
const APIFeatures = require("./../utils/apiFeatures");

function sendError(req, res, err, status) {
  res.status(status).json(err);
}

exports.getAllProducts = async function (req, res, next) {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .paginate();

  const products = await features.query;

  res.status(200).json({
    status: "success",
    results: products.length,
    payload: products,
    totalPages: 0,
    prevPage: null,
    nextPage: null,
    page: req.query.page ? req.query.page : 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevLink: null,
    nextLink: null,
  });
};

exports.getProduct = async function (req, res, next) {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({ status: "success", data: product });
  } catch (err) {
    sendError(req, res, err, 404);
  }
};

exports.createProduct = async function (req, res, next) {
  try {
    const newProduct = await Product.create(req.body);
    console.log(req.body);
    res.status(201).json({ status: "created", data: newProduct });
  } catch (err) {
    sendError(req, res, err, 500);
  }
};

exports.updateProduct = async function (req, res, next) {
  try {
    const productUpdate = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    res.status(200).json({
      status: "succes",
      data: productUpdate,
    });
  } catch (err) {
    sendError(req, res, err, 500);
  }
};

exports.deleteProduct = async function (req, res, next) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "delete succes",
      data: deletedProduct,
    });
  } catch (err) {
    sendError(req, res, err, 404);
  }
};
