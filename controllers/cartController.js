const Cart = require("./../models/cartModel");

exports.addToCart = async function (req, res, next) {
  try {
    const { productId, cantidad } = req.body;

    let cart = await Cart.findOne();

    if (!cart) {
      cart = await Cart.create({
        productos: [
          {
            producto: productId,
            cantidad: cantidad || 1,
          },
        ],
      });
    } else {
      cart.productos.push({
        producto: productId,
        cantidad: cantidad || 1,
      });
    }

    await cart.save();

    res.status(201).json({
      status: "success",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getCart = async function (req, res, next) {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findById(cartId).populate("productos.producto");

    res.status(200).json({ status: "success", products: cart });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};
