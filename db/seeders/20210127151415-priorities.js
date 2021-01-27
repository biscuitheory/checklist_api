const prioritiesNames = ['Critical', 'High', 'Normal', 'Low'];
const priorities = prioritiesNames.map((priority) => {
  return {
    name: priority,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Priorities', priorities, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Priorities', null, {});
  },
};
