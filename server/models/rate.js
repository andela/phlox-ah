module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Rate.associate = (models) => {
    Rate.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return Rate;
};
