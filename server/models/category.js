
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: DataTypes.STRING
  }, {});
  Category.associate = (models) => {
    Category.hasMany(models.Article, {
      foreignKey: 'categoryId',
      as: 'articles'
    });
  };
  return Category;
};
