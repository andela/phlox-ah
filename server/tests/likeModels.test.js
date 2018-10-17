import { expect } from 'chai';
import db from '../models';


const validLike = {
  like: true,
  articleSlug: 'title-of-article',
  userId: 1
};

const noLike = {
  articleId: 1,
  articleSlug: 'title-of-article',
  userId: 1
};
let like;
let likeError;


describe('Like model validations', () => {
  it('should like an article', (done) => {
    db.Like.create(validLike)
      .then((newLike) => {
        like = newLike;
        done();
      });
  });

  it('should like an article with the correct fields', () => {
    expect(like.like).to.equal(validLike.like);
    expect(like.articleSlug).to.equal(validLike.articleSlug);
  });

  describe('Like validation', () => {
    db.Like.create(noLike)
      .catch((error) => {
        likeError = error.message;
      });
    it('should ensure that like is not undefined', () => {
      expect(likeError).to.equal(undefined);
    });
  });
});
