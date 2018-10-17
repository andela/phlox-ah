
module.exports = (sequelize, DataTypes) => {
  const LikeComment = sequelize.define('LikeComment', {
    like: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {});
  LikeComment.associate = (models) => {
    LikeComment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    LikeComment.belongsTo(models.ArticleComment, {
      foreignKey: 'commentId',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return LikeComment;
};
