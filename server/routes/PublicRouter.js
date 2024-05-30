const express = require("express");
const PublicController = require("../controllers/PublicController");
const router = express.Router();

router.get("/merchandise", PublicController.getAllMerch);
router.get("/merchandise/:id", PublicController.getMerchById);
router.get("/standing/premiereLeague", PublicController.eplStanding);
router.get("/news/premiereLeague", PublicController.newsEpl);

module.exports = router;
