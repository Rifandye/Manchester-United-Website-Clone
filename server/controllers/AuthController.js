const { User } = require("../models");
const { comparePass } = require("../utils/bcrypt");
const { signToken } = require("../utils/jwt");

module.exports = class AuthController {
  static async register(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName) throw { name: "FirstNameRequired" };
      if (!lastName) throw { name: "LastNameRequired" };
      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };

      const user = await User.create(req.body);
      const data = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ["password"] },
      });

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };

      const user = await User.findOne({
        where: { email: email },
      });

      if (!user) throw { name: "UserNotRegistered" };

      const comparedPassword = comparePass(password, user.password);

      if (user.email !== email) throw { name: "InvalidLoginData" };
      if (!comparedPassword) throw { name: "InvalidLoginData" };

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
};
