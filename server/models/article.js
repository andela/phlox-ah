export default (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    imgUrl: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {});

  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Article.hasMany(models.ArticleComment, {
      foreignKey: 'articleSlug',
      sourceKey: 'slug',
      onDelete: 'CASCADE',
    });
  };
  return Article;
};
