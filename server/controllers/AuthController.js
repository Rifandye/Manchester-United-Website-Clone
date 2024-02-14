const { User } = require("../models/index");

module.exports = class AuthController {
  static async createUser(req, res, next) {
    try {
      const user = await User.create(req.body);
      const data = await User.findOne({
        where: { id: user.id },
      });

      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }
};
