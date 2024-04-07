'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('clients', 'codeRecoverPassword', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('clients', 'codeRecoverPassword', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
