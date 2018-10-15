/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ArticlesTags', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    articleId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Articles',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
    },
    tagId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Tags',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("(now() at time zone 'utc')")
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("(now() at time zone 'utc')")
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ArticlesTags')
};
