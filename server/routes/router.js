const express = require("express");
const router = express.Router();
const AuthRouter = require("./AuthRouter");
const MerchandiseRouter = require("./MerchandiseRouter");
const PublicRouter = require("./PublicRouter");
const UserRouter = require("./UserRouter");
const { authentication } = require("../middlewares/Authentication");

router.use("/", AuthRouter);
router.use("/pub", PublicRouter);
router.use(authentication);
router.use("/merchandises", MerchandiseRouter);
router.use("/user", UserRouter);

module.exports = router;
