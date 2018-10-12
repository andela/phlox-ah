import { expect } from 'chai';
import readTime from '../helpers/readTime';
import testArticles from '../helpers/testArticle';

describe('Article Read Time Function', () => {
  it('should be a function', () => {
    const result = readTime;
    expect(result).to.be.a('function');
  });

  it('should return a number', () => {
    const read = readTime('jdjdkkdkdjdjdjdj');
    expect(read).to.be.a('number');
  });

  it('should return 1 minute given the below article', () => {
    const articles = testArticles.oneMinuteRead;
    const read = readTime(articles);
    expect(read).to.equal(1);
  });

  it('should return 3 minutes given the below article', () => {
    const articles = testArticles.threeMinuteRead;
    const read = readTime(articles);
    expect(read).to.equal(3);
  });
});
