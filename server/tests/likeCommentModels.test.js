import { expect } from 'chai';
import db from '../models';


const validLike = {
  like: true,
  commentId: 1,
  userId: 1
};

const noLike = {
  articleId: 1,
  commentId: 1,
  userId: 1
};

let like;
let likeError;

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
    expect(like.commentId).to.equal(validLike.commentId);
  });

  describe('Like validation', () => {
    db.LikeComment.create(noLike)
      .catch((error) => {
        likeError = error.message;
      });
    it('should ensure that like is not undefined', () => {
      expect(likeError).to.equal(undefined);
    });
  });
});
