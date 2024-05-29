"use strict";
const { Model } = require("sequelize");
const { hashPass } = require("../utils/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order);
      User.hasMany(models.Cart);
    }
  }
  User.init(
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "First Name Is Required",
          },
          notNull: {
            msg: "First Name Is Required",
          },
        },
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Last Name Is Required",
          },
          notNull: {
            msg: "Last Name Is Required",
          },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Email Is Required",
          },
          notNull: {
            msg: "Email Is Required",
          },
          isEmail: {
            msg: "Invalid Email Format",
          },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password Is Required",
          },
          notNull: {
            msg: "Password Is Required",
          },
        },
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Role Is Required",
          },
          notNull: {
            msg: "Role Is Required",
          },
        },
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
