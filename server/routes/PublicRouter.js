const express = require("express");
const PublicController = require("../controllers/PublicController");
const router = express.Router();

router.get("/merchandises", PublicController.getAllMerchandisePub);
router.get("/standings", PublicController.footballApi);
router.get("/news", PublicController.newsApi);

module.exports = router;
