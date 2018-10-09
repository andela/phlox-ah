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

const tag = { name: 'sports', };

let token = '';

describe('Tags', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('Should create a tag', (done) => {
    chai.request(app)
      .post('/api/v1/tags')
      .set('x-access-token', token)
      .send(tag)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should not create a tag with invalid name', (done) => {
    chai.request(app)
      .post('/api/v1/tags')
      .set('x-access-token', token)
      .send({ title: 'sports' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should not allow an unsigned user to create tag', (done) => {
    chai.request(app)
      .post('/api/v1/tags')
      .set('x-access-token', '123abc')
      .send(tag)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should not create tag without any token', (done) => {
    chai.request(app)
      .put('/api/v1/tags')
      .send(tag)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(403);
        expect(res.body.success).to.equals(false);
        expect(res.body.message).to.equals('Missing Token');
        done();
      });
  });
});
