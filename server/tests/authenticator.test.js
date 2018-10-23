/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('Authenticator', () => {
  it('should return 403, Forbidden error', (done) => {
    chai.request(app)
      .get('/api/v1/articles')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});
