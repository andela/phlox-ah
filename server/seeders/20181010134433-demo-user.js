

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    username: 'johndoe',
    email: 'jd@something.com',
    password: 'secret123',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
