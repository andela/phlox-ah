import faker from 'faker';
import { expect } from 'chai';
import db from '../models';


const validArticle = {
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  description: faker.lorem.sentence(),
  slug: faker.lorem.sentence(),
  readTime: 3,
  userId: 1,
  categoryId: 1
};

const noTitle = {
  body: faker.lorem.paragraph(),
  description: faker.lorem.sentence(),
  readTime: 3,
  userId: 1,
  categoryId: 1
};

const noBody = {
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  slug: faker.lorem.sentence(),
  readTime: 3,
  userId: 1,
  categoryId: 1
};

const noDescription = {
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  slug: faker.lorem.sentence(),
  readTime: 3,
  userId: 1,
  categoryId: 1
};


let article;
let titleError;
let bodyError;
let descriptionError;


describe('Article model validations', () => {
  it('should create new article', (done) => {
    db.Article.create(validArticle)
      .then((newArticle) => {
        article = newArticle;
        done();
      });
  });

  it('should create a article with title, body and description', () => {
    expect(article.title).to.equal(validArticle.title);
    expect(article.body).to.equal(validArticle.body);
    expect(article.description).to.equal(validArticle.description);
  });

  describe('Title validation', () => {
    db.Article.create(noTitle)
      .catch((error) => {
        titleError = error.message;
      });
    it('should ensure that title is not null', () => {
      expect(titleError).to.equal('notNull Violation: Article.title cannot be null,\nnotNull Violation: Article.slug cannot be null');
    });
  });

  describe('Body validation', () => {
    db.Article.create(noBody)
      .catch((error) => {
        bodyError = error.message;
      });
    it('should ensure that body is not null', () => {
      expect(bodyError).to.equal('notNull Violation: Article.body cannot be null');
    });
  });

  describe('Description validation', () => {
    db.Article.create(noDescription)
      .catch((error) => {
        descriptionError = error.message;
      });
    it('should ensure that body is not null', () => {
      expect(descriptionError).to.equal('notNull Violation: Article.description cannot be null');
    });
  });
});
