

export default (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { min: 10, max: 100 }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: { min: 10, max: 100 }
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {});


  Profile.associate = (models) => {
    // associations can be defined here
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Profile;
};


