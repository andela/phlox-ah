module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    username: 'johndoe',
    email: 'jd@something.com',
    password: 'secret123',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: 'janedoe',
    email: 'janedoe@something.com',
    password: 'secret123',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
