import { expect } from 'chai';
import db from '../models';


const validRate = {
  rating: 4,
  userId: 1,
  articleId: 2,
};

const noRating = {
  userId: 1,
  articleId: 2
};

const noUserId = {
  rating: 4,
  articleId: 2,
};

const noArticleId = {
  rating: 4,
  userId: 1,
};


let rate;
let ratingError;
let userIdError;
let articleIdError;


describe('Article model validations', () => {
  it('should create new rate', (done) => {
    db.Rate.create(validRate)
      .then((newRate) => {
        rate = newRate;
        done();
      }).timeout(20000);
  });

  it('should create a rate with rating, userId and articleId', () => {
    expect(rate.rating).to.equal(validRate.rating);
    expect(rate.userId).to.equal(validRate.userId);
    expect(rate.articleId).to.equal(validRate.articleId);
  });

  describe('Rating validation', () => {
    db.Rate.create(noRating)
      .catch((error) => {
        ratingError = error.message;
      });
    it('should ensure that rating is not null', () => {
      expect(ratingError).to.equal('notNull Violation: Rate.rating cannot be null');
    });
  });

  describe('UserId validation', () => {
    db.Rate.create(noUserId)
      .catch((error) => {
        userIdError = error.message;
      });
    it('should ensure that body is not null', () => {
      expect(userIdError).to.equal('notNull Violation: Rate.userId cannot be null');
    });
  });

  describe('Validate ratings', () => {
    db.Rate.create(noArticleId)
      .catch((error) => {
        articleIdError = error.message;
      });
    it('should ensure that body is not null', () => {
      expect(articleIdError).to.equal('notNull Violation: Rate.articleId cannot be null');
    });
  });
});
