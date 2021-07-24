module.exports = (sequelize, DataTypes) => {

  const Companies = sequelize.define('Companies',{
    name:{
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Companies.associate = (models)=>{
    Companies.hasOne(models.Heroes)
  }
  return Companies;
};