/* eslint-disable no-unused-vars */
// 'use strict';

module.exports = {
  // eslint-disable-next-line
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [
      { name: 'sports', },
      { name: 'technology', },
      { name: 'entertainment', },
      { name: 'javascript', },
      { name: 'babel', },
      { name: 'html', },
      { name: 'people', },
      { name: 'gadgets', },
    ], {});
  },

  // eslint-disable-next-line
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
