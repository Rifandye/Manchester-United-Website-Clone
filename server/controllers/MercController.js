const { Merchandise, Category, Catalogue } = require("../models/index");

module.exports = class MerchController {
  static async postMerch(req, res, next) {
    try {
      const merch = await Merchandise.create(req.body);

      const categoryIds = req.body.CategoryId;

      if (Array.isArray(categoryIds)) {
        for (const categoryId of categoryIds) {
          await Catalogue.create({
            MerchandiseId: merch.id,
            CategoryId: categoryId,
          });
        }
      } else {
        await Catalogue.create({
          MerchandiseId: merch.id,
          CategoryId: categoryIds,
        });
      }

      const data = await Merchandise.findOne({
        where: { id: merch.id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Catalogue,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
              {
                model: Category,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
          },
        ],
      });

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getAllMerch(req, res, next) {
    try {
      const merch = await Merchandise.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      res.status(200).json(merch);
    } catch (error) {
      next(error);
    }
  }

  static async getMerchById(req, res, next) {
    try {
      const merch = await Merchandise.findByPk(req.params.id);

      if (merch === null) throw { name: "NotFound" };

      res.status(200).json(merch);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMerchById(req, res, next) {
    try {
      //!delete dulu yang ada di table conjuction baru bisa delete table Merchandise(FK constraint)
      await Catalogue.destroy({
        where: { MerchandiseId: req.params.id },
      });

      const merch = await Merchandise.destroy({
        where: { id: req.params.id },
      });

      if (!merch) throw { name: "NotFound" };

      res.status(200).json({ message: "A Merchandise has been deleted" });
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
