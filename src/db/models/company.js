module.exports = (sequelize, DataTypes) => {

  const Companies = sequelize.define('Companies',{
    name:{
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    paranoid: true,
    timestamps: true,
  });

  Companies.associate = (models)=>{
    Companies.hasOne(models.Heroes)
  }
  return Companies;
};