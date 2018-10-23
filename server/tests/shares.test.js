/* eslint-disable prefer-destructuring */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import Authenticator from '../middlewares/authenticator';

chai.use(chaiHttp);
const token = Authenticator.generateToken({ id: 1, username: 'johndoe', email: 'janedoe@something.com' });
describe('`Shares', () => {
  it('should share an article', (done) => {
    chai.request(app)
      .post('/api/v1/share/title-of-article1')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('successfully shared an article');
        done();
      });
  });

  it('should return number of times an article was shared', (done) => {
    chai.request(app)
      .get('/api/v1/share/title-of-article1')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.sharesCount).to.equal(1);
        done();
      });
  });
});
