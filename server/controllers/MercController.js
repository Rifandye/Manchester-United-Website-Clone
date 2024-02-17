const {
  Merchandise,
  Category,
  Merchandise_Category,
} = require("../models/index");

module.exports = class MerchController {
  static async postMerch(req, res, next) {
    try {
      const merch = await Merchandise.create(req.body);

      const categoryIds = req.body.CategoryId;

      if (Array.isArray(categoryIds)) {
        for (const categoryId of categoryIds) {
          await Merchandise_Category.create({
            MerchandiseId: merch.id,
            CategoryId: categoryId,
          });
        }
      } else {
        await Merchandise_Category.create({
          MerchandiseId: merch.id,
          CategoryId: categoryIds,
        });
      }

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
      const merch = await Merchandise.findByPk(req.params.id);
      console.log(merch);
      res.status(200).json(merch);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMerchById(req, res, next) {
    try {
      //!delete dulu yang ada di table conjuction baru bisa delete table Merchandise(FK constraint)
      await Merchandise_Category.destroy({
        where: { MerchandiseId: req.params.id },
      });

      const merch = await Merchandise.destroy({
        where: { id: req.params.id },
      });

      res.status(200).json(merch);
    } catch (error) {
      next(error);
    }
  }

  static async updateMerchById(req, res, next) {
    try {
      const merch = await Merchandise.findByPk(req.params.id);
      await merch.update(req.body);

      res.status(200).json(merch);
    } catch (error) {
      next(error);
    }
  }
};
