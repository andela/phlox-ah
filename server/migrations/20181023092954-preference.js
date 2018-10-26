

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Preferences', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Preferences')
};
