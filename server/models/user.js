export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = models => {
    // associations can be defined here
  };
  return User;
};
