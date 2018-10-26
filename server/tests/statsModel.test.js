import { expect } from 'chai';
import db from '../models';

const validStats = {
  userId: 1,
  articleId: 1
};

const invalidArticleId = {
  userId: 1,
  noarticleId: 100
};

let stats = '';
let nameError = '';

describe('Stats model validations', () => {
  it('should create a new stats', (done) => {
    db.Stats.create(validStats)
      .then((newStats) => {
        stats = newStats;
        done();
      });
  });

  it('should create a stats with userId and articleId', () => {
    expect(stats.userId).to.equal(validStats.userId);
    expect(stats.articleId).to.equal(validStats.articleId);
  });

  describe('Validate articleId', () => {
    db.Stats.create(invalidArticleId)
      .catch((error) => {
        nameError = error.message;
      });
    it('should ensure that articleId is not null', () => {
      expect(nameError).to.equal('notNull Violation: Stats.articleId cannot be null');
    });
  });
});
