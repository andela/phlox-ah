/* eslint-disable prefer-destructuring */
import faker from 'faker';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
let token = '';
let createdArticle = '';

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

describe('Rates', () => {
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
          .end((err, res) => {
            createdArticle = res.body.article;
            done();
          });
      });
  });

  it('Should rate an article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${createdArticle.slug}/rate`)
      .set('x-access-token', token)
      .send({ rating: 2 })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Article has been rated');
        done();
      });
  });

  it('Should not rate an article that does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/articles/1234abcdef/rate')
      .set('x-access-token', token)
      .send({ rating: 2 })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Article does not exist');
        done();
      });
  });

  it('Should not allow an unauthenticated user to rate an article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${createdArticle.slug}/rate`)
      .set('x-access-token', '1234abc')
      .send({ rating: 2 })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message.name).to.be.equal('JsonWebTokenError');
        done();
      });
  });

  it('Should not allow a rating value that is not a number or float', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${createdArticle.slug}/rate`)
      .set('x-access-token', token)
      .send({ rating: 'one' })
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Rating must be a valid number of float');
        done();
      });
  });
});
