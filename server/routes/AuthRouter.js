const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.post("/add-user", AuthController.createUser);

module.exports = router;
