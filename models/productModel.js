const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"] },
    description: { type: String, required: [true, "description is required"] },
    code: { type: String, required: [true, "code is required"], unique: true },
    price: { type: Number, required: [true, "price is required"], min: 0 },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: [true, "stock is required"], min: 0 },
    category: { type: String, required: [true, "category is required"] },
    thumbnails: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema, "products");
