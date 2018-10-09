
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      unique: {
        msg: 'this tag already exists'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'tag is not allowed to be empty'
        }
      }
    },
  }, {});
  Tag.associate = (models) => {
    Tag.hasMany(models.ArticlesTag, {
      foreignKey: 'tagId',
      as: 'tagsOfArticles'
    });
  };
  return Tag;
};
