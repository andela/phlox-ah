
module.exports = (sequelize, DataTypes) => {
  const HighlightAndComment = sequelize.define('HighlightAndComment', {
    articleSlug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    selectedText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  HighlightAndComment.associate = (models) => {
    HighlightAndComment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    HighlightAndComment.belongsTo(models.Article, {
      foreignKey: 'articleSlug',
      targetKey: 'slug',
      onDelete: 'CASCADE',
    });
  };
  return HighlightAndComment;
};
