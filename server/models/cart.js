"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User);
      Cart.belongsTo(models.Merchandise);
    }
  }
  Cart.init(
    {
      paidStatus: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Paid Status Is Required",
          },
          notNull: {
            msg: "Paid Status Is Required",
          },
        },
        defaultValue: "Pending",
      },
      UserId: DataTypes.INTEGER,
      MerchandiseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
