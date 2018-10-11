import { expect } from 'chai';
import db from '../models';

const validArticleTag = {
  articleId: 1,
  tagId: 1
};

const invalidTagId = {
  articleId: 1,
  notagId: 100
};

let articleTag = '';
let nameError = '';

describe('Article Tag model validations', () => {
  it('should create a new article tag', (done) => {
    db.ArticlesTags.create(validArticleTag)
      .then((newArticleTag) => {
        articleTag = newArticleTag;
        done();
      });
  });

  it('should create a tag with articleId and tagId', () => {
    expect(articleTag.articleId).to.equal(validArticleTag.articleId);
    expect(articleTag.tagId).to.equal(validArticleTag.tagId);
  });

  describe('Validate tagId', () => {
    db.ArticlesTags.create(invalidTagId)
      .catch((error) => {
        nameError = error.message;
      });
    it('should ensure that tagId is not null', () => {
      expect(nameError).to.equal('notNull Violation: ArticlesTags.tagId cannot be null');
    });
  });
});
