const bcrypt = require('bcrypt');

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
    email: 'jane@something.com',
    password: bcrypt.hashSync('password', 10),
    isVerified: true,
    role: 'User',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: 'jackdoe',
    email: 'jack@something.com',
    password: bcrypt.hashSync('password', 10),
    isVerified: true,
    role: 'Author',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: 'jackson',
    email: 'jackson@something.com',
    password: bcrypt.hashSync('password', 10),
    isVerified: true,
    role: 'Admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
