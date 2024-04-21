'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'viewText', {
      type: Sequelize.ENUM('active', 'disable'),
      allowNull: true,
      defaultValue: 'active',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'viewText');
  },
};
