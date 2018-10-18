import { expect } from 'chai';
import db from '../models';


const validBookmark = {
  articleId: 1,
  userId: 1,
};

const noArticleId = {
  userId: 1
};

const noUserId = {
  articleId: 1
};

let bookmark;
let userIdError;
let articleIdError;


describe('Bookmark model validations', () => {
  it('should create new rate', (done) => {
    db.Bookmark.create(validBookmark)
      .then((newBookmark) => {
        bookmark = newBookmark;
        done();
      }).timeout(20000);
  });

  it('should create a bookmark with articleId and userId', () => {
    expect(bookmark.articleId).to.equal(validBookmark.articleId);
    expect(bookmark.userId).to.equal(validBookmark.userId);
  });

  describe('Validate articleId', () => {
    db.Bookmark.create(noArticleId)
      .catch((error) => {
        articleIdError = error.message;
      });
    it('should ensure that articleId is not null', () => {
      expect(articleIdError).to.equal('notNull Violation: Bookmark.articleId cannot be null');
    });
  });

  describe('Validate UserId', () => {
    db.Bookmark.create(noUserId)
      .catch((error) => {
        userIdError = error.message;
      });
    it('should ensure that userId is not null', () => {
      expect(userIdError).to.equal('notNull Violation: Bookmark.userId cannot be null');
    });
  });
});
