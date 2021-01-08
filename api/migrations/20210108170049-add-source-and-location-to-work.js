'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('works', 'source', {
      type: Sequelize.STRING,
      after: 'acquisitionCost'
    })
    await queryInterface.addColumn('works', 'location', {
      type: Sequelize.STRING,
      after: 'source'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('works', 'source')
    await queryInterface.removeColumn('works', 'location')
  }
};
