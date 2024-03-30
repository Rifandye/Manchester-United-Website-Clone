const express = require("express");
const MerchController = require("../controllers/MercController");
const router = express.Router();
const { authorizationForAdmin } = require("../middlewares/Authorization");
const multer = require("multer");
const uploud = multer({
  storage: multer.memoryStorage(),
});

router.post("/", authorizationForAdmin, MerchController.postMerch);
router.get("/", authorizationForAdmin, MerchController.getAllMerch);
router.get("/:id", authorizationForAdmin, MerchController.getMerchById);
router.put("/:id", authorizationForAdmin, MerchController.updateMerchById);
router.delete("/:id", authorizationForAdmin, MerchController.deleteMerchById);
router.patch(
  "/:id/imgUrl",
  authorizationForAdmin,
  uploud.single("img"),
  MerchController.uploadImgById
);

module.exports = router;
