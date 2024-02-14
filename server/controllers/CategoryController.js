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

  static async postCategory(req, res, next) {
    try {
      const category = await Category.create(req.body);

      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategoriesById(req, res, next) {
    try {
      const category = await Category.destroy({
        where: { id: req.params.id },
      });
      if (!category) throw { name: "CategoryNotFound" };
    } catch (error) {
      next(error);
    }
  }
};
