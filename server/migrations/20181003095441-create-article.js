
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Articles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING
    },
    body: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    slug: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: Sequelize.STRING
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING
    },
    imgUrl: {
      allowNull: true,
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      },
    },
    ratingAverage: {
      allowNull: true,
      defaultValue: 0,
      type: Sequelize.FLOAT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Articles')
};
