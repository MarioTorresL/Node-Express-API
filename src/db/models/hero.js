module.exports = (sequelize, DataTypes) => {

  const Heroes = sequelize.define('Heroes',{
    name:{
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    paranoid: true,
    timestamps: true,
  });

  Heroes.associate = (models)=>{
    Heroes.belongsTo( models.Movies, {foreignKey: 'MovieId'} )
    Heroes.belongsTo( models.Companies, {foreignKey: 'CompanyId'})
    Heroes.hasOne(models.Publications)
  }
  return Heroes;
};