// add isVerified to the model file, it will be use to check if the user is verified.
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    isVerified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verifyToken: {
      type: DataTypes.STRING
    },
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Article, {
      foreignKey: 'userId',
      as: 'articles'
    });
  };
  return User;
};
