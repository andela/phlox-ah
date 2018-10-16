import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('POST /Search', () => {
  it('should make a successful search using author', (done) => {
    chai.request(app)
      .post('/api/v1/search')
      .send({ keyword: 'doe', searchWith: 'author' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.success).to.equals(true);
        expect(res.body.message).to.eql('found result');
        done();
      });
  });
  it('should not make a successful search using author', (done) => {
    chai.request(app)
      .post('/api/v1/search')
      .send({ keyword: 'Unknown', searchWith: 'author' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(404);
        expect(res.body.success).to.equals(false);
        expect(res.body.message).to.eql('User not found');
        done();
      });
  });
  it('should make a successful search using article', (done) => {
    chai.request(app)
      .post('/api/v1/search')
      .send({ keyword: 'title1', searchWith: 'article' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.success).to.equals(true);
        expect(res.body.message).to.eql('found result');
        done();
      });
  });
  it('should not make a successful search using article', (done) => {
    chai.request(app)
      .post('/api/v1/search')
      .send({ keyword: 'xxx', searchWith: 'article' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(404);
        expect(res.body.success).to.equals(false);
        expect(res.body.message).to.eql('Nothing Found');
        done();
      });
  });
  it('should make a successful search using tags', (done) => {
    chai.request(app)
      .post('/api/v1/search')
      .send({ keyword: 'sports', searchWith: 'tag' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.success).to.equals(true);
        expect(res.body.message).to.eql('found result');
        done();
      });
  });
  it('should not make a successful search using tags', (done) => {
    chai.request(app)
      .post('/api/v1/search')
      .send({ keyword: 'unknown', searchWith: 'tag' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(404);
        expect(res.body.success).to.equals(false);
        expect(res.body.message).to.eql('Nothing Found');
        done();
      });
  });
});
