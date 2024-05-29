module.exports = class PublicController {
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
};
