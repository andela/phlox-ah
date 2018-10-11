export default (sequelize, DataTypes) => {
  const Followings = sequelize.define('Followings', {
    follower: {
      type: DataTypes.INTEGER
    },
    followed: {
      type: DataTypes.INTEGER
    }
  }, {});
  Followings.associate = (models) => {
    Followings.belongsTo(models.User, {
      foreignKey: 'followed',
      onDelete: 'CASCADE'
    });

    Followings.belongsTo(models.User, {
      foreignKey: 'follower',
      onDelete: 'CASCADE'
    });
  };
  return Followings;
};
