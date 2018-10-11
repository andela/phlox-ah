
module.exports = (sequelize, DataTypes) => {
  const ArticlesTags = sequelize.define('ArticlesTags', {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'article id cannot empty'
        }
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'tag id cannot be empty'
        }
      }
    },
  }, {});
  ArticlesTags.associate = (models) => {
    ArticlesTags.belongsTo(models.Tag, {
      foreignKey: 'tagId',
      onDelete: 'CASCADE'
    });
    ArticlesTags.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return ArticlesTags;
};
