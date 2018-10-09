export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: {
        msg: 'this username already exists'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'username is not allowed to be empty'
        },
        len: {
          args: 2,
          msg: 'username length must be at least 2 characters long'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'this email already exists'
      },
      allowNull: false,
      validate: {
        isLowercase: {
          msg: 'email address must be lowercase'
        },
        isEmail: {
          msg: 'email must be a valid email'
        },
        notEmpty: {
          msg: 'email is not allowed to be empty'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password is not allowed to be empty'
        },
      }
    },
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Article, {
      foreignKey: 'userId',
      as: 'articles'
    });
    User.hasMany(models.ArticleComment, {
      foreignKey: 'userId',
    });
    User.hasOne(models.Profile, {
      foreignKey: 'username',
      sourceKey: 'username',
    });
  };
  return User;
};
