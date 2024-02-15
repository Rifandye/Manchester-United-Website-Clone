const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.post("/add-user", AuthController.createUser);
router.post("/login", AuthController.login);
router.post("/google-login", AuthController.googleLogin);

module.exports = router;
