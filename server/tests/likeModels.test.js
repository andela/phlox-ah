import { expect } from 'chai';
import db from '../models';


const validLike = {
  like: true,
  dislike: false,
  articleSlug: 'title-of-article1',
  userId: 1
};

const noLike = {
  dislike: false,
  articleId: 1,
  articleSlug: 'title-of-article1',
  userId: 1
};

const noDislike = {
  like: false,
  articleSlug: 'title-of-article1',
  userId: 1
};

let like;
let likeError;
let dislikeError;


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
    expect(like.dislike).to.equal(validLike.dislike);
    expect(like.articleSlug).to.equal(validLike.articleSlug);
  });

  describe('Like validation', () => {
    db.Like.create(noLike)
      .catch((error) => {
        likeError = error.message;
      });
    it('should ensure that like is not null', () => {
      expect(likeError).to.equal('notNull Violation: Like.like cannot be null');
    });
  });

  describe('Dislike validation', () => {
    db.Like.create(noDislike)
      .catch((error) => {
        dislikeError = error.message;
      });
    it('should ensure that dislike is not null', () => {
      expect(dislikeError).to.equal('notNull Violation: Like.dislike cannot be null');
    });
  });
});
