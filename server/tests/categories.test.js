/* eslint-disable prefer-destructuring */
import faker from 'faker';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
let token = '';

const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'password'
};

describe('Categories', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('Should get all categories', (done) => {
    chai.request(app)
      .get('/api/v1/categories')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('categories retrieved successfully');
        done();
      });
  });
  it('Should add to categories', (done) => {
    chai.request(app)
      .post('/api/v1/categories')
      .set('x-access-token', token)
      .send({
        category: 'bollywood'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('category created successfully');
        done();
      });
  });
  it('Should not add to categories if categories exist', (done) => {
    chai.request(app)
      .post('/api/v1/categories')
      .set('x-access-token', token)
      .send({
        category: 'bollywood'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('this category already exists');
        done();
      });
  });
  it('Should get all articles in a categoriy', (done) => {
    chai.request(app)
      .get('/api/v1/religion/articles')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('articles retrieved successfully');
        done();
      });
  });
  it('Should not get articles with an invalid  category', (done) => {
    chai.request(app)
      .get('/api/v1/religionsis/articles')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('category does not exist');
        done();
      });
  });
  it('Should not get articles when categories do not have articles', (done) => {
    chai.request(app)
      .get('/api/v1/culture/articles')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('there are no articles on this category');
        done();
      });
  });
});
