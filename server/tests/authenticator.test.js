/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('Authenticator', () => {
  it('should return 403, Forbidden error', (done) => {
    chai.request(app)
      .get('/api/v1/stats')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI3MTM3NjQ2LCJleHAiOjE1MjcyMjQwNDZ9.0J2YZ8LAUpEnauDvl21U2OjHIQjRBzR70PlLVvNPD9o')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).to.be.eql('Invalid token supplied');
        done();
      });
  });

  it('should return 403, Forbidden error', (done) => {
    chai.request(app)
      .get('/api/v1/articles/title-of-article2')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI3MTM3NjQ2LCJleHAiOjE1MjcyMjQwNDZ9.0J2YZ8LAUpEnauDvl21U2OjHIQjRBzR70PlLVvNPD9o')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).to.be.eql('Invalid token supplied');
        done();
      });
  });

  it('should return 403, Forbidden error', (done) => {
    chai.request(app)
      .get('/api/v1/articles/title-of-article2')
      .set('x-access-token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI3MTM3NjQ2LCJleHAiOjE1MjcyMjQwNDZ9.0J2YZ8LAUpEnauDvl21U2OjHIQjRBzR70PlLVvNPD9o')
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});
