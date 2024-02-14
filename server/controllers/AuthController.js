const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
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
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "EmailIsRequired" };

      if (!password) throw { name: "PasswordIsRequired" };

      const user = await User.findOne({ where: { email } });

      const comparedPasssword = comparePass(password, user.password);

      if (!comparedPasssword) throw { name: "EmailNotRegistered" };

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
};
