
module.exports = (sequelize, DataTypes) => {
  const CommentsHistory = sequelize.define('CommentsHistory', {
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  CommentsHistory.associate = (models) => {
    CommentsHistory.belongsTo(models.ArticleComment, {
      foreignKey: 'commentId',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
    CommentsHistory.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
    CommentsHistory.belongsTo(models.Article, {
      foreignKey: 'articleSlug',
      targetKey: 'slug',
      onDelete: 'CASCADE'
    });
  };
  return CommentsHistory;
};
