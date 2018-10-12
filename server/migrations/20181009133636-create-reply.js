
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Replies', {
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
      onDelete: 'CASCADE',
      references: {
        model: 'ArticleComments',
        key: 'id',
        as: 'commentId',
      },
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
  down: queryInterface => queryInterface.dropTable('Replies')
};
