const Product = require("../../models/productModel");

class ProductDaoMongo {
  async create(data) { return Product.create(data); }
  async findAll(query = {}) { return Product.find(query); }
}

module.exports = ProductDaoMongo;
