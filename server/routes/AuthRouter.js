const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.post("/add-user", AuthController.createUser);
router.post("/login", AuthController.login);

module.exports = router;
