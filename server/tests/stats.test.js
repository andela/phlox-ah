/* eslint-disable prefer-destructuring */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const user = {
  emailOrUsername: 'jack@something.com',
  password: 'Password1!'
};

let token = '';

describe('Stats', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/login')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('should get users stats', (done) => {
    chai.request(app)
      .get('/api/v1/stats')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Your Stats');
        done();
      });
  });
});
