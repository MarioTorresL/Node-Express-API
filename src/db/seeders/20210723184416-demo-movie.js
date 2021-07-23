'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Movies', [
      {
        actor: 'Brandon Routh',
        name: 'Superman Returns',
        date: new Date(Date.UTC(2006, 7, 28)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        actor: 'Christian Bale',
        name: 'Batman Begins',
        date: new Date(Date.UTC(2008, 6, 18)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        actor: 'Robert Downey Jr.,',
        name: 'Iron Man 3',
        date: new Date(Date.UTC(2013, 5, 3)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        actor: 'Chris Evans',
        name: 'Captain America: The Winter Soldier',
        date: new Date(Date.UTC(2014, 4, 4)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Movies', null, {});
  }
};
