
export default (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    comment: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {});

  Reply.associate = (models) => {
    Reply.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Reply.belongsTo(models.ArticleComment, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE',
    });
    Reply.hasMany(models.LikeReply, {
      foreignKey: 'replyId',
      as: 'likes',
      onDelete: 'CASCADE',
    });
  };
  return Reply;
};
