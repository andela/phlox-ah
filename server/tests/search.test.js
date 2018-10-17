import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('POST /Search', () => {
  it('should make a successful search using author', (done) => {
    chai.request(app)
      .get('/api/v1/search?author=doe')
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
      .get('/api/v1/search?author=unknown')
      .send()
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(404);
        expect(res.body.success).to.equals(false);
        expect(res.body.message).to.eql('Nothing Found');
        done();
      });
  });
  it('should make a successful search using article', (done) => {
    chai.request(app)
      .get('/api/v1/search?article=title1')
      .send()
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
      .get('/api/v1/search?article=xxx')
      .send()
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
      .get('/api/v1/search?tag=sports')
      .send()
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
      .get('/api/v1/search?tag=unknown')
      .send()
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(404);
        expect(res.body.success).to.equals(false);
        expect(res.body.message).to.eql('Nothing Found');
        done();
      });
  });
});
