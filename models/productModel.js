const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nombreProducto: {
    type: String,
    required: [true, "El producto necesita tener un nombre"],
  },
  precioProducto: {
    type: Number,
    required: [true, "El producto debe tener un precio"],
  },
  descripcion: {
    type: String,
  },
  cantidadDisponible: {
    type: Number,
    required: [true, "El producto debe tener una cantidad"],
  },
  categoriaProducto: {
    type: String,
    required: [true, "El producto debe pertenecer a una categoria"],
  },
  img: {
    type: String,
    required: [true, "el producto debe tener una imagen"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
