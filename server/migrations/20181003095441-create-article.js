
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Articles', {
    id: {
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
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
      primaryKey: true,
      unique: true,
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
    readTime: {
      allowNull: false,
      type: Sequelize.INTEGER,
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
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Categories',
        key: 'id',
        as: 'categoryId'
      },
    },
    ratingAverage: {
      allowNull: true,
      defaultValue: 0,
      type: Sequelize.FLOAT
    },
    featured: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'draft',
      allowNull: false
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
