const express = require("express");
const PublicController = require("../controllers/PublicController");
const router = express.Router();

router.get("/merchandise", PublicController.getAllMerch);
router.get("/merchandise/:id", PublicController.getMerchById);

module.exports = router;
