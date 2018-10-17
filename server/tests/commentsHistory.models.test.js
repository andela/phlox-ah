import { expect } from 'chai';
import db from '../models';


const validCommentHistory = {
  articleSlug: 'How-to-use-the-faker-package-306a8a4c-57ee-4ac1-898d-cbca809e1e8d',
  userId: 5,
  commentId: 1,
  comment: 'comment test modified'
};

const noUserId = {
  articleSlug: 'How-to-use-the-faker-package-306a8a4c-57ee-4ac1-898d-cbca809e1e8d',
  commentId: 1,
  comment: 'comment test modified'
};

const noArticleSlug = {
  userId: 5,
  commentId: 1,
  comment: 'comment test modified'
};

const noCommentId = {
  articleSlug: 'How-to-use-the-faker-package-306a8a4c-57ee-4ac1-898d-cbca809e1e8d',
  userId: 5,
  comment: 'comment test modified'
};

const noComment = {
  articleSlug: 'How-to-use-the-faker-package-306a8a4c-57ee-4ac1-898d-cbca809e1e8d',
  userId: 5,
  commentId: 1
};

let commentHistory;
let userIdError;
let articleSlugError;
let commentIdError;
let commentError;


describe('Bookmark model validations', () => {
  it('should create new rate', (done) => {
    db.CommentsHistory.create(validCommentHistory)
      .then((newHistory) => {
        commentHistory = newHistory;
        done();
      }).timeout(20000);
  });

  it('should create a commentHistory with articleId, userId, commentId and comment', () => {
    expect(commentHistory.articleId).to.equal(validCommentHistory.articleId);
    expect(commentHistory.userId).to.equal(validCommentHistory.userId);
    expect(commentHistory.articleSlug).to.equal(validCommentHistory.articleSlug);
    expect(commentHistory.comment).to.equal(validCommentHistory.comment);
  });

  describe('Validate articleId', () => {
    db.CommentsHistory.create(noArticleSlug)
      .catch((error) => {
        articleSlugError = error.message;
      });
    it('should ensure that article slug is not null', () => {
      expect(articleSlugError).to.equal('null value in column "articleSlug" violates not-null constraint');
    });
  });

  describe('Validate userId', () => {
    db.CommentsHistory.create(noUserId)
      .catch((error) => {
        userIdError = error.message;
      });
    it('should ensure that user id is not null', () => {
      expect(userIdError).to.equal('notNull Violation: CommentsHistory.userId cannot be null');
    });
  });

  describe('Validate commentId', () => {
    db.CommentsHistory.create(noCommentId)
      .catch((error) => {
        commentIdError = error.message;
      });
    it('should ensure that comment id is not null', () => {
      expect(commentIdError).to.equal('notNull Violation: CommentsHistory.commentId cannot be null');
    });
  });

  describe('Validate comment', () => {
    db.CommentsHistory.create(noComment)
      .catch((error) => {
        commentError = error.message;
      });
    it('should ensure that comment is not null', () => {
      expect(commentError).to.equal('notNull Violation: CommentsHistory.comment cannot be null');
    });
  });
});
