
module.exports = (sequelize, DataTypes) => {
  const Highlight = sequelize.define('Highlight', {
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
  Highlight.associate = (models) => {
    Highlight.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Highlight.belongsTo(models.Article, {
      foreignKey: 'articleSlug',
      targetKey: 'slug',
      onDelete: 'CASCADE',
    });
  };
  return Highlight;
};
