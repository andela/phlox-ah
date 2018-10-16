module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Profiles', [{
    firstName: 'John',
    lastName: 'Doe',
    contact: 'Test street',
    gender: 'male',
    bio: 'Lowkey bad guy',
    username: 'johndoe',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    contact: 'Testing gals street',
    gender: 'female',
    bio: 'beautiful queen',
    username: 'janedoe',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('Profiles', null, {})
};
