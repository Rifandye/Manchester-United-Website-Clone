const { Merchandise } = require("../models");

module.exports = class MerchandiseController {
  static async createMerch(req, res, next) {
    try {
      const merch = await Merchandise.create(req.body);
      const data = await Merchandise.findByPk(merch.id);

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getAllMerch(req, res, next) {
    try {
      const data = await Merchandise.findAll();

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getMerchById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Merchandise.findByPk(id);

      if (!data) throw { name: "InvalidMerchId" };

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async updateMerchById(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, imageUrl, price } = req.body;

      const merch = await Merchandise.findByPk(id);

      if (!merch) throw { name: "InvalidMerchId" };

      await merch.update({
        name,
        description,
        imageUrl,
        price,
      });

      res.status(200).json(merch);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMerchById(req, res, next) {
    try {
      const { id } = req.params;
      const merch = await Merchandise.findByPk(id);
      if (!merch) throw { name: "InvalidMerchId" };

      let merchName = merch.name;

      await Merchandise.destroy({
        where: { id: id },
      });

      res.status(200).json({
        message: `Merchandise with name: ${merchName} has been deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
};
