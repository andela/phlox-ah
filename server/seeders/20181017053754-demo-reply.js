module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Replies', [{
    commentId: 1,
    comment: 'comment on article',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Replies', null, {})
};
