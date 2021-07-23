'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) =>{

  class Movies extends Model{

    static associations(models){
      //associations here
      Movies.hasOne(Heroes)
    }
  };

  Movies.init({
    name:DataTypes.STRING,
    actor:DataTypes.STRING,
    date: DataTypes.DATE
  },{
   sequelize,
   modelName:'Movies', 
  });

  return Movies;
};