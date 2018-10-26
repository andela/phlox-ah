export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
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
    resetToken: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    expireAt: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    isVerified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verifyToken: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM,
      defaultValue: 'User',
      values: ['Admin', 'Author', 'User']
    },
    emailNotification: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Article, {
      foreignKey: 'userId',
      as: 'articles'
    });
    User.hasMany(models.ArticleComment, {
      foreignKey: 'userId',
    });
    User.hasMany(models.Like, {
      foreignKey: 'userId',
      as: 'likes'
    });
    User.hasMany(models.Notification, {
      foreignKey: 'userId',
    });
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      sourceKey: 'id'
    });
    User.belongsToMany(User, {
      as: 'follower',
      through: models.Followings,
      foreignKey: 'follower',
    });
    User.belongsToMany(User, {
      as: 'followed',
      through: models.Followings,
      foreignKey: 'followed',
    });
    User.hasMany(models.Bookmark, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Highlight, {
      foreignKey: 'userId'
    });
    User.hasMany(models.CommentsHistory, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Shares, {
      foreignKey: 'userId'
    });
    User.belongsToMany(models.Category, {
      through: 'Preferences',
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
