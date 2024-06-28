const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/auth/google", AuthController.googleLogin);
router.get("/auth/google/callback", AuthController.googleLoginCallback);

module.exports = router;
