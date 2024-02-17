"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categoriesData = require("../data/categories.json").map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();

      return el;
    });
    await queryInterface.bulkInsert("Categories", categoriesData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
