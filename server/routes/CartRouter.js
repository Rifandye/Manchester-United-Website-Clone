const express = require("express");
const CartController = require("../controllers/CartController");
const router = express.Router();

router.post("/cart", CartController.addCart);
router.get("/cart", CartController.getAllCartByUserId);
router.get("/midtrans/payment", CartController.midtransPayment);
router.patch("/buy", CartController.updatePayment);

module.exports = router;
