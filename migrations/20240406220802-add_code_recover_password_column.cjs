'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('clients', 'codeRecoverPassword', {
      type: Sequelize.STRING,
      allowNull: true, // O según tu lógica de negocio
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('clie', 'codeRecoverPassword');
  },
};
