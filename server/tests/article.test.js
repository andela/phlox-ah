/* eslint-disable prefer-destructuring */
import faker from 'faker';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

let slug = '';

const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'password'
};

const article = {
  title: faker.random.word(),
  body: faker.random.words(),
  description: faker.random.words()
};

let token = '';

describe('Articles', () => {
  before((done) => {
    chai.request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('Should create an article', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-access-token', token)
      .send(article)
      .end((err, res) => {
        slug = res.body.slug;
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should get all articles', (done) => {
    chai.request(app)
      .get('/api/v1/articles/feed')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should get articles of logged in users', (done) => {
    chai.request(app)
      .get('/api/v1/articles')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should update articles', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${slug}`)
      .set('x-access-token', token)
      .send(article)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should delete a users articles', (done) => {
    chai.request(app)
      .delete(`/api/v1/articles/${slug}`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
