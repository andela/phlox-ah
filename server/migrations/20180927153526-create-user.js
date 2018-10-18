/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        min: 5
      }
    },
    resetToken: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    expireAt: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    isVerified: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    verifyToken: {
      type: Sequelize.STRING
    },
    emailNotification: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },

  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
