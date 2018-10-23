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
    readTime: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    ratingAverage: {
      allowNull: true,
      type: DataTypes.FLOAT
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'draft',
      validate: {
        isIn: {
          args: [['draft', 'published']],
          msg: 'status must be either draft or published'
        }
      }
    }
  }, {});

  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
    Article.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
    Article.hasMany(models.ArticleComment, {
      foreignKey: 'articleSlug',
      sourceKey: 'slug',
      onDelete: 'CASCADE',
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
    Article.hasMany(models.Report, {
      foreignKey: 'articleSlug',
    });
    Article.hasMany(models.Bookmark, {
      foreignKey: 'articleId'
    });
    Article.hasMany(models.CommentsHistory, {
      foreignKey: 'articleSlug',
      onDelete: 'CASCADE',
    });

    Article.belongsToMany(models.Tag, { as: 'Tags', through: 'ArticlesTags', foreignKey: 'articleId' });
  };
  return Article;
};
