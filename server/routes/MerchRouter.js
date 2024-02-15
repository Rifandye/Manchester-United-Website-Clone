const express = require("express");
const MerchController = require("../controllers/MercController");
const router = express.Router();
const { authorizationForAdmin } = require("../middlewares/Authorization");

router.post("/", authorizationForAdmin, MerchController.postMerch);
router.get("/", authorizationForAdmin, MerchController.getAllMerch);
router.get("/:id", authorizationForAdmin, MerchController.getMerchById);
router.put("/:id", authorizationForAdmin, MerchController.updateMerchById)
router.delete("/:id", authorizationForAdmin, MerchController.deleteMerchById);

module.exports = router;
