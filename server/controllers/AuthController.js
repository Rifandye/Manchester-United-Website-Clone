const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");

const oauth2client = new OAuth2Client();

module.exports = class AuthController {
  static async createUser(req, res, next) {
    try {
      const user = await User.create(req.body);
      const data = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password", "phoneNumber", "createdAt", "updatedAt"],
        },
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

      const role = user.role;

      res.status(200).json({ access_token, role });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    console.log(req.headers);
    try {
      const ticket = await oauth2client.verifyIdToken({
        idToken: req.headers["google-token"],
        audience: process.env.GOOGLE_KEY,
      });

      const payload = ticket.getPayload();
      console.log(payload);

      let user = await User.findOne({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        user = await User.create({
          firstname: payload.given_name,
          lastname: payload.family_name,
          email: payload.email,
          password: "dummy-password-" + Date.now() + Math.random(),
        });
      }

      const access_token = signToken({ id: user.id });

      res.status(201).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
};
