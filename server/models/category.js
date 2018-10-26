
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: DataTypes.STRING
  }, {});
  Category.associate = (models) => {
    Category.hasMany(models.Article, {
      foreignKey: 'categoryId',
      as: 'articles'
    });
    Category.belongsToMany(models.User, {
      through: 'Preferences',
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    });
  };
  return Category;
};
