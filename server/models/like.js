
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    like: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {});
  Like.associate = (models) => {
    Like.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Like.belongsTo(models.Article, {
      foreignKey: 'articleSlug',
      targetKey: 'slug',
      onDelete: 'CASCADE'
    });
  };
  return Like;
};
