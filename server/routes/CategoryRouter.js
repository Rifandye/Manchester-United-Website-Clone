const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();
const { authorizationForAdmin } = require("../middlewares/Authorization");

router.post("/", authorizationForAdmin, CategoryController.postCategory);
router.get("/", authorizationForAdmin, CategoryController.getAllCategories);
router.get("/:id", authorizationForAdmin, CategoryController.getCategoriesById);
router.delete(
  "/:id",
  authorizationForAdmin,
  CategoryController.deleteCategoriesById
);

module.exports = router;
