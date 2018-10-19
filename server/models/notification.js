module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    userId: DataTypes.INTEGER,
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    articleSlug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seen: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {});
  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      as: 'user', foreignKey: 'userId'
    });
  };
  return Notification;
};
