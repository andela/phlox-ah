import { expect } from 'chai';
import db from '../models';


const shareSample = {
  userId: 1,
  articleSlug: 'sample-article-slug'
};
const invalidShareSample = {
  userId: 1,
};

describe('Shares Model', () => {
  it('should record an article share on database', (done) => {
    db.Shares.create(shareSample)
      .then(() => {
        done();
      });
  });

  it('should not record share on database without article slug', () => {
    db.Shares.create(invalidShareSample)
      .catch((error) => {
        expect(error.message).to.equal('notNull Violation: Shares.articleSlug cannot be null');
      });
  });
});
