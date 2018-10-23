
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reports', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    articleSlug: {
      allowNull: false,
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      references: {
        model: 'Articles',
        key: 'slug',
      },
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING
    },
    body: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    approve: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
  down: queryInterface => queryInterface.dropTable('Reports')
};
