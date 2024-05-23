const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");
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
  included_granted_scopes: true,
});

module.exports = class AuthController {
  static async createUser(req, res, next) {
    try {
      console.log(req.body);
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

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static googleLogin(req, res, next) {
    res.redirect(authorizationUrl);
  }

  static async googleCallback(req, res, next) {
    try {
      const { code } = req.query;

      const { tokens } = await oauth2Client.getToken(code);

      oauth2Client.setCredentials(tokens);

      const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2",
      });

      const { data } = await oauth2.userinfo.get();

      if (!data) {
        return res.json({
          data: data,
        });
      }

      let user = await User.findOne({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        user = await User.create({
          firstname: data.given_name,
          lastname: data.family_name,
          email: data.email,
          password: "dummy-password" + Math.random(),
        });
      }

      const access_token = signToken({ id: user.id });

      res
        .status(200)
        .json({ message: "Google login successful", user, access_token });
    } catch (error) {
      next(error);
    }
  }
};
