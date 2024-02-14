const {
  Merchandise,
  Category,
  Merchandise_Category,
} = require("../models/index");

module.exports = class MerchController {
  static async postMerch(req, res, next) {
    try {
      const merch = await Merchandise.create(req.body);

      const categoryId = req.body.CategoryId;

      await Merchandise_Category.create({
        MerchandiseId: merch.id,
        CategoryId: categoryId,
      });

      const data = await Merchandise.findOne({
        where: { id: merch.id },
        include: {
          model: Merchandise_Category,
          include: {
            model: Category,
          },
        },
      });

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getAllMerch(req, res, next) {
    try {
      const merch = await Merchandise.findAll();

      res.status(200).json(merch);
    } catch (error) {
      next(error);
    }
  }

  static async getMerchById(req, res, next) {
    try {
      const merch = await Merchandise.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json(merch);
    } catch (error) {
      next(error);
    }
  }
};
