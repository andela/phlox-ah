/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Articles', 'status', {
    allowNull: false,
    type: Sequelize.STRING,
    defaultValue: 'draft'
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Articles', 'status')
};
