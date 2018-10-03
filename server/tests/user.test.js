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

let token = '';

describe('Users', () => {
  before((done) => {
    chai.request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        /* eslint-disable prefer-destructuring */
        token = res.body.token;
        done();
      });
  });

  it('Should signup a user', (done) => {
    chai.request(app)
      .post('/api/signup')
      .send({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'password'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('token');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should access a protected route', (done) => {
    chai.request(app)
      .get('/api/test')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should access a protected route without any token', (done) => {
    chai.request(app)
      .get('/api/test')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(403);
        done();
      });
  });
});
