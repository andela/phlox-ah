export default (sequelize, DataTypes) => {
  const ArticleComment = sequelize.define('ArticleComment', {
    comment: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {});

  ArticleComment.associate = (models) => {
    ArticleComment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    ArticleComment.belongsTo(models.Article, {
      foreignKey: 'articleSlug',
      targetKey: 'slug',
      onDelete: 'CASCADE',
    });
    ArticleComment.hasMany(models.Reply, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE',
    });
    ArticleComment.hasMany(models.CommentsHistory, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE',
    });
  };
  return ArticleComment;
};
