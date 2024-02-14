const express = require("express");
const PublicController = require("../controllers/PublicController");
const router = express.Router();

router.get("/", PublicController.getAllMerchandisePub);

module.exports = router;
