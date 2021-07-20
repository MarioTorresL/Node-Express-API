'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) =>{

  class Movie extends Model{

    static associations(models){
      //associations here
      Movie.hasOne(Hero)
    }
  };

  Movie.init({
    actor:DataTypes.STRING,
    date: DataTypes.DATE
  },{
   sequelize,
   modelName:'Movie', 
  });

  return Movie;
};