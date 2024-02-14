const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();

router.get("/", CategoryController.getAllCategories);
router.post("/", CategoryController.postCategory);
router.get("/:id", CategoryController.getCategoriesById);
router.delete("/:id", CategoryController.deleteCategoriesById);

module.exports = router;
