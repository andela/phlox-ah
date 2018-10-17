
export default (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    body:{
      allowNull: false,
      type: DataTypes.TEXT
    }, 
    resolved:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }, 
  }, {});
  Report.associate = function(models) {
    Report.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    }); 
    Report.belongsTo(models.Article, {
      foreignKey: 'articleSlug',
      onDelete: 'CASCADE',
    }); 
  };
  return Report;
};
