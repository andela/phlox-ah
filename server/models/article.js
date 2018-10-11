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
    },
    ratingAverage: {
      allowNull: true,
      type: DataTypes.FLOAT
    }
  }, {});
  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Article.hasMany(models.Like, {
      foreignKey: 'articleSlug',
      sourceKey: 'slug',
      as: 'likes'
    });
    Article.hasMany(models.Rate, {
      foreignKey: 'articleId',
      as: 'rates'
    });
  };
  return Article;
};
