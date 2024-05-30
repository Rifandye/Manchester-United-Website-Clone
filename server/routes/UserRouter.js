const express = require("express");
const CartController = require("../controllers/CartController");
const PublicController = require("../controllers/PublicController");
const router = express.Router();

router.post("/cart", CartController.addCart);
router.get("/cart", CartController.getAllCartByUserId);
router.get("/midtrans/payment", CartController.midtransPayment);
router.delete("/remove/cart/:id", CartController.removeCartById);
router.patch("/buy", CartController.updatePayment);
router.get("/profile", PublicController.getUserProfile);

module.exports = router;
