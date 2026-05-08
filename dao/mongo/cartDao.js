const Cart = require("../../models/cartModel");

class CartDaoMongo {
  async create() { return Cart.create({ products: [] }); }
  async findById(id) { return Cart.findById(id).populate("products.product"); }
}

module.exports = CartDaoMongo;
