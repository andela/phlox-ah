module.exports = {
  up: queryInterface => queryInterface.bulkInsert('ArticleComments', [{
    articleSlug: 'title-of-article1',
    comment: 'comment on article',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('ArticleComments', null, {})
};
