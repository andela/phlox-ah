
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('LikeReplies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    like: {
      type: Sequelize.BOOLEAN
    },
    dislike: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      },
    },
    replyId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Replies',
        key: 'id',
        as: 'replyId'
      },
    },
  }),

  down: queryInterface => queryInterface.dropTable('LikeReplies')
};
