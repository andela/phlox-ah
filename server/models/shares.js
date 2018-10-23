module.exports = (sequelize, DataTypes) => {
  const Shares = sequelize.define('Shares', {
    userId: DataTypes.INTEGER,
    articleSlug: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Shares.associate = (models) => {
    Shares.belongsTo(models.User, {
      as: 'user', foreignKey: 'userId'
    });
    Shares.belongsTo(models.Article, {
      as: 'article', foreignKey: 'articleSlug'
    });
  };
  return Shares;
};
