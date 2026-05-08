const express = require("express");
const cartController = require("./../controllers/cartController");

const router = express.Router();

router.route("/").post(cartController.addToCart);
router.route("/:cartId").get(cartController.getCart);

module.exports = router;
