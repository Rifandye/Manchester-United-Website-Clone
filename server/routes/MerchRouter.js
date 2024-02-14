const express = require("express");
const MerchController = require("../controllers/MercController");
const router = express.Router();

router.post("/", MerchController.postMerch);
router.get("/", MerchController.getAllMerch);
router.get("/:id", MerchController.getMerchById);

module.exports = router;
