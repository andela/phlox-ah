import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

let token = '';
let articleSlug = '';
let reportId = null;

const user = {
  username: 'dimeji199',
  email: 'dimeji019@ola.com',
  password: 'password009'
};


const article = {
  title: 'How to use the faker package',
  body: 'faker.js contains a super useful generator method Faker.fake for combining faker API methods using a mustache string format.',
  description: 'Fake package is an handy package when it comes to generation random data.',
  tags: []
};


const report = {
  title: 'The title of an article report',
  body: 'This body of an article report',
};

const editReport = {
  title: 'The title of an article report is edited',
  body: 'This body of an article report is edited',
};


describe('Report', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        const { token: validToken } = res.body;
        token = validToken;
        done();
      });
  });

  it('Should create an article', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-access-token', token)
      .send(article)
      .end((err, res) => {
        articleSlug = res.body.article.slug;
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.article).to.be.have.property('slug');
        expect(res.body.article).to.be.have.property('title');
        expect(res.body.article).to.be.have.property('description');
        expect(res.body.article).to.be.have.property('body');
        done();
      });
  });

  it('Should create a report', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${articleSlug}/reports`)
      .set('x-access-token', token)
      .send(report)
      .end((err, res) => {
        reportId = res.body.report.id;
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.report).to.be.have.property('resolved');
        expect(res.body.report).to.be.have.property('title');
        expect(res.body.report).to.be.have.property('body');
        done();
      });
  });

  it('Should not create a report', (done) => {
    chai.request(app)
      .post('/api/v1/articles/slug-title-123/reports')
      .set('x-access-token', token)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.have.property('success');
        expect(res.body).to.be.have.property('message');
        done();
      });
  });

  it('Should not create a report', (done) => {
    chai.request(app)
      .post('/api/v1/articles/slug-title-123/reports')
      .set('x-access-token', token)
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.have.property('status');
        expect(res.body).to.be.have.property('message');
        done();
      });
  });

  it('Should not edit non-existing report', (done) => {
    chai.request(app)
      .put('/api/v1/articles/slug-title-123/reports/100/edit')
      .set('x-access-token', token)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.have.property('success');
        expect(res.body).to.be.have.property('message');
        done();
      });
  });

  it('Should edit a report', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${articleSlug}/reports/${reportId}/edit`)
      .set('x-access-token', token)
      .send(editReport)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.report).to.be.have.property('resolved');
        expect(res.body.report).to.be.have.property('title');
        expect(res.body.report).to.be.have.property('body');
        done();
      });
  });

  it('Should resolve a report', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${articleSlug}/reports/${reportId}/resolve`)
      .set('x-access-token', token)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.report).to.be.have.property('resolved');
        expect(res.body.report).to.be.have.property('title');
        expect(res.body.report).to.be.have.property('body');
        done();
      });
  });

  it('Should not get all resolved report for an article', (done) => {
    chai.request(app)
      .get('/api/v1/articles/slug-title-123/reports/resolved')
      .set('x-access-token', token)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.have.property('success');
        expect(res.body).to.be.have.property('message');
        done();
      });
  });

  it('Should get all resolved report for an article', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${articleSlug}/reports/resolved`)
      .set('x-access-token', token)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.have.property('success');
        expect(res.body).to.be.have.property('message');
        expect(res.body).to.be.have.property('reports');
        done();
      });
  });

  it('Should not get all unresolved report for an article', (done) => {
    chai.request(app)
      .get('/api/v1/articles/slug-title-123/reports/unresolved')
      .set('x-access-token', token)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.have.property('success');
        expect(res.body).to.be.have.property('message');
        done();
      });
  });

  it('Should get all unresolved report for an article', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${articleSlug}/reports/unresolved`)
      .set('x-access-token', token)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.have.property('success');
        expect(res.body).to.be.have.property('message');
        expect(res.body).to.be.have.property('reports');
        done();
      });
  });

  it('Should get all unresolved report for an article', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${articleSlug}/reports/unresolved`)
      .set('x-access-token', token)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.have.property('success');
        expect(res.body).to.be.have.property('message');
        expect(res.body).to.be.have.property('reports');
        done();
      });
  });

  it('Should get all resolved report', (done) => {
    chai.request(app)
      .get('/api/v1/reports/resolved')
      .set('x-access-token', token)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.have.property('success');
        expect(res.body).to.be.have.property('message');
        expect(res.body).to.be.have.property('reports');
        done();
      });
  });

  it('Should get all unresolved report', (done) => {
    chai.request(app)
      .get('/api/v1/reports/unresolved')
      .set('x-access-token', token)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.have.property('success');
        expect(res.body).to.be.have.property('message');
        expect(res.body).to.be.have.property('reports');
        done();
      });
  });
});
