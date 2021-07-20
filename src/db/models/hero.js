'use stric';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Hero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associations(models) {
      //associations here
      Hero.belongsTo( Company, { as: 'CompanyId' } )
      Hero.belongsTo( Movie, { as: 'MovieId' } )

    }

  };

  Hero.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hero'
  });

  return Hero;
};