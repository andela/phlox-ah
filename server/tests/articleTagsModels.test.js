import { expect } from 'chai';
import db from '../models';

const validArticleTag = {
  articleId: 1,
  tagId: 1
};
// const invalidArticleId = {
//   noarticleId: 1,
//   tagId: 1
// };
const invalidTagId = {
  articleId: 1,
  notagId: 1
};
let articleTag = '';
let nameError = '';

describe('Article Tag model validations', () => {
  it('should create a new article tag', (done) => {
    db.ArticlesTag.create(validArticleTag)
      .then((newArticleTag) => {
        articleTag = newArticleTag;
        done();
      });
  });

  it('should create a tag with articleId and tagId', () => {
    expect(articleTag.articleId).to.equal(validArticleTag.articleId);
    expect(articleTag.tagId).to.equal(validArticleTag.tagId);
  });

  // describe('Validate articleId', () => {
  //   db.ArticlesTag.create(invalidArticleId)
  //     .catch((error) => {
  //       nameError = error.message;
  //     });
  //   it('should ensure that articleId is not null', () => {
  //     expect(nameError).to.equal('notNull Violation: ArticlesTag.tagId cannot be null');
  //   });
  // });

  describe('Validate tagId', () => {
    db.ArticlesTag.create(invalidTagId)
      .catch((error) => {
        nameError = error.message;
      });
    it('should ensure that tagId is not null', () => {
      expect(nameError).to.equal('notNull Violation: ArticlesTag.tagId cannot be null');
    });
  });
});
