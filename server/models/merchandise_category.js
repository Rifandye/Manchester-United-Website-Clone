"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Merchandise_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Merchandise_Category.belongsTo(models.Category);
      Merchandise_Category.belongsTo(models.Merchandise);
    }
  }
  Merchandise_Category.init(
    {
      MerchandisesId: {
        type: DataTypes.INTEGER,
      },

      CategoryId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Merchandise_Category",
    }
  );
  return Merchandise_Category;
};
