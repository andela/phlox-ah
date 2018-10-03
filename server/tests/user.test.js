import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
let token = '';
const wrongToken = 'jkuyhgbnjhgvbnjhgvbnjhgvb';
const user = {
  username: 'nelson@nnaji.comgj',
  email: 'nelson@nnaji.comgu',
  password: 'player009'
};

describe('Users', () => {
  it('Should signup a user', (done) => {
    chai.request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        token = res.body;
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('token');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Access a protected route', () => {
  it('Should access a protected route', (done) => {
    chai.request(app)
      .get('/api/test')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Access a protected route without any token', () => {
  it('SShould throw an error 403', (done) => {
    chai.request(app)
      .get('/api/test')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('Access a protected route with a wrong token', () => {
  it('Should throw an error 403', (done) => {
    chai.request(app)
      .get('/api/test')
      .set('x-access-token', wrongToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(403);
        done();
      });
  });
});
