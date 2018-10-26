/* eslint-disable prefer-destructuring */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
let adminToken;
let authorToken;

describe('Categories', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/login')
      .send({ emailOrUsername: 'jack@something.com', password: 'password' })
      .end((err, res) => {
        authorToken = res.body.token;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/login')
      .send({ emailOrUsername: 'jackson@something.com', password: 'password' })
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });

  it('Should get all categories', (done) => {
    chai.request(app)
      .get('/api/v1/categories')
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
      .set('x-access-token', adminToken)
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
      .set('x-access-token', adminToken)
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
  it('Should not add to categories if user is not an admin', (done) => {
    chai.request(app)
      .post('/api/v1/categories')
      .set('x-access-token', authorToken)
      .send({
        category: 'bollywood'
      })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('No Permission to Access this Resources');
        done();
      });
  });
  it('Should get all articles in a categoriy', (done) => {
    chai.request(app)
      .get('/api/v1/religion/articles')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('articles retrieved successfully');
        done();
      });
  });
  it('Should not get articles with an invalid category', (done) => {
    chai.request(app)
      .get('/api/v1/religionsis/articles')
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
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('there are no articles on this category');
        done();
      });
  });
});
