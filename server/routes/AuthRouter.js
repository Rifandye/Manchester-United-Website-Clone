const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.post("/add-user", AuthController.createUser);
router.post("/login", AuthController.login);
router.get("/auth/google", AuthController.googleLogin);
router.get("/auth/google/callback", AuthController.googleCallback);

module.exports = router;
