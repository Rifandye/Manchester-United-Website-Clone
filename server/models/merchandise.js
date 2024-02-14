"use strict";
const { Model } = require("sequelize");
const priceFormat = require("../helpers/convertPrice");
module.exports = (sequelize, DataTypes) => {
  class Merchandise extends Model {
    static associate(models) {
      Merchandise.hasMany(models.Order);
      Merchandise.hasMany(models.Merchandise_Category);
    }

    get formattedPrice() {
      return priceFormat(this.salary);
    }
  }
  Merchandise.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },

      description: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Description is required",
          },
        },
      },

      imageUrl: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Image is required",
          },
          notEmpty: {
            msg: "Image is required",
          },
        },
      },

      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "Price is required",
          },
          notEmpty: {
            msg: "Price is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Merchandise",
    }
  );
  return Merchandise;
};
