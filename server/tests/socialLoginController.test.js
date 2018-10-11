/* eslint-disable object-curly-newline */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import SocialLoginController from '../controllers/socialLoginController';
import app from '..';

chai.use(chaiHttp);
// This is a mock profile
const profile = {
  emails: [{ value: 'emailfromsocial@gmail.com' }],
};

// Test the strategy callback method
describe('Social login controller test', () => {
  it('should handle social login callback request;', (done) => {
    SocialLoginController.passportCallback('accessToken', 'refreshToken', profile, done);
  });

  it('it should return a user who signed up via social media', (done) => {
    chai.request(app)
      .post('/api/v1/login/response')
      .send({ id: 1, email: 'nelson@yahoo.com', username: 'nelson', created: true })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.nested.property('user.email');
        expect(res.body).to.have.nested.property('user.username');
        done();
      });
  });

  it('it should return a user who loged in via social media', (done) => {
    chai.request(app)
      .post('/api/v1/login/response')
      .send({ id: 1, email: 'nelson@yahoo.com', username: 'nelson', })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.nested.property('user.email');
        expect(res.body).to.have.nested.property('user.username');
        done();
      });
  });
});
