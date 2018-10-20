/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Highlights', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    articleSlug: {
      allowNull: true,
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      references: {
        model: 'Articles',
        key: 'slug',
        as: 'articleSlug',
      },
    },
    selectedText: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    comment: {
      allowNull: false,
      type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Highlights')
};
