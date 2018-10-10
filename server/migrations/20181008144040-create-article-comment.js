
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ArticleComments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
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
    commentId: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    comment: {
      allowNull: false,
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('ArticleComments')
};
