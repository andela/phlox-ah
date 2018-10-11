module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Articles', [{
    title: 'title of article',
    body: 'body of article',
    slug: 'title-of-article',
    description: 'description of article',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Articles', null, {})
};
