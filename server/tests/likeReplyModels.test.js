import { expect } from 'chai';
import db from '../models';


const validLike = {
  like: true,
  dislike: false,
  replyId: 1,
  userId: 1
};

const noLike = {
  dislike: false,
  articleId: 1,
  replyId: 1,
  userId: 1
};

const noDislike = {
  like: false,
  replyId: 1,
  userId: 1
};

let like;
let likeError;
let dislikeError;


describe('LikeReply model validations', () => {
  it('should like a reply ', (done) => {
    db.LikeReply.create(validLike)
      .then((newLike) => {
        like = newLike;
        done();
      });
  });

  it('should like a reply with the correct fields', () => {
    expect(like.like).to.equal(validLike.like);
    expect(like.dislike).to.equal(validLike.dislike);
    expect(like.replyId).to.equal(validLike.replyId);
  });

  describe('Like validation', () => {
    db.LikeReply.create(noLike)
      .catch((error) => {
        likeError = error.message;
      });
    it('should ensure that like is not null', () => {
      expect(likeError).to.equal('notNull Violation: LikeReply.like cannot be null');
    });
  });

  describe('Dislike validation', () => {
    db.LikeReply.create(noDislike)
      .catch((error) => {
        dislikeError = error.message;
      });
    it('should ensure that dislike is not null', () => {
      expect(dislikeError).to.equal('notNull Violation: LikeReply.dislike cannot be null');
    });
  });
});
