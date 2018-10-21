module.exports = (sequelize, DataTypes) => {
  const Stats = sequelize.define('Stats', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Stats.associate = (models) => {
    Stats.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Stats.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return Stats;
};
