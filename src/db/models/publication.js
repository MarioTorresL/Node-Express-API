module.exports = (sequelize, DataTypes) =>{

  const Publications = sequelize.define('Publications',{

  });

  Publications.associate = (models)=>{
    Publications.belongsTo(models.Users, {foreignKey: 'UserId'});
    Publications.belongsTo(models.Heroes, {foreignKey: 'HeroId'})
  }
  return Publications
}