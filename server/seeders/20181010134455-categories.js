module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Categories', [{
    category: 'religion',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: 'technology',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: 'arts',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: 'animals',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: 'culture',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: 'finance',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: 'sports',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: 'medicine',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: 'gadgets',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: 'programming',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: 'history',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: 'fashion',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: 'general',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Categories', null, {})
};
