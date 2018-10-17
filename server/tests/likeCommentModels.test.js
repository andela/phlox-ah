import { expect } from 'chai';
import db from '../models';


const validLike = {
  like: true,
  dislike: false,
  commentId: 1,
  userId: 1
};

const noLike = {
  dislike: false,
  articleId: 1,
  commentId: 1,
  userId: 1
};

const noDislike = {
  like: false,
  commentId: 1,
  userId: 1
};

let like;
let likeError;
let dislikeError;


describe('LikeComment model validations', () => {
  it('should like a comment', (done) => {
    db.LikeComment.create(validLike)
      .then((newLike) => {
        like = newLike;
        done();
      });
  });

  it('should like a comment with the correct fields', () => {
    expect(like.like).to.equal(validLike.like);
    expect(like.dislike).to.equal(validLike.dislike);
    expect(like.commentId).to.equal(validLike.commentId);
  });

  describe('Like validation', () => {
    db.LikeComment.create(noLike)
      .catch((error) => {
        likeError = error.message;
      });
    it('should ensure that like is not null', () => {
      expect(likeError).to.equal('notNull Violation: LikeComment.like cannot be null');
    });
  });

  describe('Dislike validation', () => {
    db.LikeComment.create(noDislike)
      .catch((error) => {
        dislikeError = error.message;
      });
    it('should ensure that dislike is not null', () => {
      expect(dislikeError).to.equal('notNull Violation: LikeComment.dislike cannot be null');
    });
  });
});
