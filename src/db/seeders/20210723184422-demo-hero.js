'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Heroes',[
      {
        name:'Superman',
        CompanyId:2,
        MovieId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Batman',
        CompanyId: 2,
        MovieId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Iron Man',
        CompanyId:1,
        MovieId:3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Capitan America',
        CompanyId:1,
        MovieId:4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Heroes', null, {})
  }
};
