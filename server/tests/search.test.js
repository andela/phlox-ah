import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('POST /Search', () => {
  it('should make a successful search', (done) => {
    chai.request(app)
      .post('/api/v1/search')
      .send({ keyword: 'johndoe', searchWith: 'author' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.success).to.equals(true);
        expect(res.body.message).to.eql('found result');
        done();
      });
  });
  it('should not make a successful search', (done) => {
    chai.request(app)
      .post('/api/v1/search')
      .send({ keyword: 'xxx', searchWith: 'author' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(404);
        expect(res.body.success).to.equals(false);
        expect(res.body.message).to.eql('Nothing Found');
        done();
      });
  });
  it('should make a successful search', (done) => {
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
  it('should not make a successful search', (done) => {
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
});
