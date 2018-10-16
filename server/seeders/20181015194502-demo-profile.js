module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Profiles', [{
    firstName: 'John',
    lastName: 'Doe',
    contact: 'Test street',
    gender: 'male',
    bio: 'Lowkey bad guy',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    contact: 'Testing gals street',
    gender: 'female',
    bio: 'beautiful queen',
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('Profiles', null, {})
};
