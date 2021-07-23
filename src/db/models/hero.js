'use stric';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Heroes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associations(models) {
      //associations here
      Heroes.belongsTo( Companies, { as: 'CompanyId' } )
      Heroes.belongsTo( Movies, { as: 'MovieId' } )

    }

  };

  Heroes.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Heroes'
  });

  return Heroes;
};