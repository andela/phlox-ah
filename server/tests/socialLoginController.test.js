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

  it('it should return a token and redirect to the frontend url when a user sign up via social media', (done) => {
    chai.request(app)
      .post('/api/v1/login/response')
      .redirects(0)
      .send({ id: 1, email: 'nelson@yahoo.com', username: 'nelson', created: true })
      .end((err, res) => {
        const { token } = res.headers;
        expect(res.status).to.equal(302);
        expect(res).to.redirectTo(`${process.env.FRONTEND_URL}?token=${token}`);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('it should return a token and redirect to the frontend url when a user login via social media', (done) => {
    chai.request(app)
      .post('/api/v1/login/response')
      .redirects(0)
      .send({ id: 1, email: 'nelson@yahoo.com', username: 'nelson' })
      .end((err, res) => {
        const { token } = res.headers;
        expect(res.status).to.equal(302);
        expect(res).to.redirectTo(`${process.env.FRONTEND_URL}?token=${token}`);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
