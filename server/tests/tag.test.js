/* eslint-disable prefer-destructuring */
import faker from 'faker';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'Password1!'
};

const tags = ['tech-sports', 'recent-sports'];

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
      .send({ tags })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Tags created successfully');
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
        expect(res.body.message).to.be.equal('Bad Request');
        done();
      });
  });

  it('Should not allow an unsigned user to create tag', (done) => {
    chai.request(app)
      .post('/api/v1/tags')
      .set('x-access-token', '123abc')
      .send(tags)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message.name).to.be.equal('JsonWebTokenError');
        done();
      });
  });

  it('should not create tag without any token', (done) => {
    chai.request(app)
      .post('/api/v1/tags')
      .send(tags)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(403);
        expect(res.body.success).to.equals(false);
        expect(res.body.message).to.equals('Missing Token');
        done();
      });
  });

  it('should get all tags', (done) => {
    chai.request(app)
      .get('/api/v1/tags')
      .set('x-access-token', token)
      .send()
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Tags retrieved successfully');
        done();
      });
  });

  it('should get one tag', (done) => {
    chai.request(app)
      .get(`/api/v1/tags/${tags[0]}`)
      .set('x-access-token', token)
      .send(tags)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Tag retrieved successfully');
        done();
      });
  });

  it('Should delete a tag', (done) => {
    chai.request(app)
      .delete(`/api/v1/tags/${tags[0]}`)
      .set('x-access-token', token)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
  });
});
