"use strict";
const { Model } = require("sequelize");
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

      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Phone Number is required",
          },
          notEmpty: {
            msg: "Phone Number is required",
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
  return User;
};
