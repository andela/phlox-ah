/* eslint-disable prefer-destructuring */
import faker from 'faker';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'password'
};

const article = {
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  description: faker.lorem.sentences()
};

const validArticleTag = {};

const tag = { name: 'sports', };

let token = '';
// eslint-disable-next-line
let createdArt = '';
// eslint-disable-next-line
let createdTag = '';

describe('ArticleTags', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        chai.request(app)
          .post('/api/v1/articles')
          .set('x-access-token', token)
          .send(article)
          .end((error, response) => {
            createdArt = response.body.article;
            validArticleTag.articleId = response.body.article.id;
            chai.request(app)
              .post('/api/v1/tags')
              .set('x-access-token', token)
              .send(tag)
              .end((er, re) => {
                createdTag = re.body.tag;
                validArticleTag.tagId = re.body.tag.id;
                done();
              });
          });
      });
  });

  it('Should create an article tag', (done) => {
    chai.request(app)
      .post('/api/v1/articletags')
      .set('x-access-token', token)
      .send(validArticleTag)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
