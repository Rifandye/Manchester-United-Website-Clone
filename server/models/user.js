"use strict";
const { Model } = require("sequelize");
const { hashPass } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order);
    }
  }
  User.init(
    {
      firstname: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "First Name is required",
          },
          notEmpty: {
            msg: "First Name is required",
          },
        },
      },
      lastname: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Last Name is required",
          },
          notEmpty: {
            msg: "Last Name is required",
          },
        },
      },
      email: {
        allowNull: false,
        unique: {
          msg: "Email already taken",
        },
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Enter a valid email address",
          },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "Fans",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    user.password = hashPass(user.password);
  });

  return User;
};
