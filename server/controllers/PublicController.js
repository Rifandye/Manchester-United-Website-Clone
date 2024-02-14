const {
  Merchandise,
  Merchandise_Category,
  Category,
} = require("../models/index");

module.exports = class PublicController {
  static async getAllMerchandisePub(req, res, next) {
    try {
      const merch = await Merchandise.findAll();

      res.status(200).json(merch);
    } catch (error) {
      next(error);
    }
  }
};
