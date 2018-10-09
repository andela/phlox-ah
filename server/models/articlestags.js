
module.exports = (sequelize, DataTypes) => {
  const ArticlesTag = sequelize.define('ArticlesTag', {
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
  ArticlesTag.associate = (models) => {
    ArticlesTag.belongsTo(models.Tag, {
      foreignKey: 'tagId',
      onDelete: 'CASCADE'
    });
    ArticlesTag.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return ArticlesTag;
};
