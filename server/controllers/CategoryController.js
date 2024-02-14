const { Category } = require("../models/index");

module.exports = class CategoryController {
  static async getAllCategories(req, res, next) {
    try {
      const category = await Category.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
};
