const express = require("express");
const cartController = require("./../controllers/cartController");

const router = express.Router();

router.route("/").post(cartController.createCart);
router
  .route("/:cid")
  .get(cartController.getCart)
  .put(cartController.updateCartProducts)
  .delete(cartController.clearCart);

router
  .route("/:cid/products/:pid")
  .post(cartController.addProductToCart)
  .put(cartController.updateProductQuantity)
  .delete(cartController.deleteProductFromCart);

module.exports = router;
