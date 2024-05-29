const express = require("express");
const MerchandiseController = require("../controllers/MerchandiseController");
const router = express.Router();

router.post("/", MerchandiseController.createMerch);
router.get("/", MerchandiseController.getAllMerch);
router.get("/:id", MerchandiseController.getMerchById);
router.put("/:id", MerchandiseController.updateMerchById);
router.delete("/:id", MerchandiseController.deleteMerchById);

module.exports = router;
