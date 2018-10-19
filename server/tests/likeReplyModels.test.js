import { expect } from 'chai';
import db from '../models';


const validLike = {
  like: true,
  replyId: 1,
  userId: 1
};

const noLike = {
  articleId: 1,
  replyId: 1,
  userId: 1
};

let like;
let likeError;


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
    expect(like.replyId).to.equal(validLike.replyId);
  });

  describe('Like validation', () => {
    db.LikeReply.create(noLike)
      .catch((error) => {
        likeError = error.message;
      });
    it('should ensure that like is not undefined', () => {
      expect(likeError).to.equal(undefined);
    });
  });
});
