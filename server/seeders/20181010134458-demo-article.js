module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Articles', [{
    title: 'title1',
    body: 'body of article1',
    slug: 'title-of-article1',
    description: 'description of article1',
    userId: 1,
    categoryId: 1,
    readTime: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'title2',
    body: 'body of article 2',
    slug: 'title-of-article2',
    description: 'description of article2',
    userId: 2,
    categoryId: 2,
    readTime: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'title3',
    body: 'body of article3',
    slug: 'title-of-article3',
    description: 'description of article3',
    userId: 1,
    categoryId: 3,
    readTime: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Articles', null, {})
};
