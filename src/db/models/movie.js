
module.exports = (sequelize, DataTypes) =>{

  const Movies = sequelize.define('Movies',{
    name:{
      type: DataTypes.STRING,
      allowNUll: false
    },
    actor:{
      type: DataTypes.STRING,
      allowNUll: false
    },
    date:{
      type: DataTypes.DATE,
      allowNUll: false
    }
  })

  Movies.associate = (models)=>{
    Movies.hasMany(models.Heroes)
  }
  return Movies;
};