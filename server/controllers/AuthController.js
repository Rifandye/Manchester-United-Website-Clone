const { User } = require("../models");
const { comparePass } = require("../utils/bcrypt");
const { signToken } = require("../utils/jwt");
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/auth/google/callback"
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

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

  static async googleLogin(req, res, next) {
    res.redirect(authorizationUrl);
  }

  static async googleLoginCallback(req, res, next) {
    try {
      const { code } = req.query;
      const { tokens } = await oauth2Client.getToken(code);

      oauth2Client.setCredentials(tokens);

      const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2",
      });

      const { data } = await oauth2.userinfo.get();

      const user = await User.findOne({ where: { email: data.email } });

      if (!user) {
        await User.create({
          firstName: data.given_name,
          lastName: data.family_name,
          email: data.email,
          password: "dummy-password" + Math.random(),
        });
      }

      const access_token = signToken({ id: user.id });

      res.status(201).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
};
