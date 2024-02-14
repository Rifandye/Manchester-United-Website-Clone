const express = require("express");
const router = express.Router();
const AuthRouter = require("./AuthRouter");
const CategoryRouter = require("./CategoryRouter");
const MerchRouter = require("./MerchRouter");
const { authentication } = require("../middlewares/Authentication");

router.use(AuthRouter);
router.use(authentication);
router.use("/merchandises", MerchRouter);
router.use("/categories", CategoryRouter);

module.exports = router;
