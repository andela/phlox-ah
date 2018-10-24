import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

let userToken;
let adminToken;
let authorToken;
let articleSlug = '';
let reportId = null;

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
      .post('/api/v1/login')
      .send({ emailOrUsername: 'jane@something.com', password: 'password' })
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/login')
      .send({ emailOrUsername: 'jack@something.com', password: 'password' })
      .end((err, res) => {
        authorToken = res.body.token;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/login')
      .send({ emailOrUsername: 'jackson@something.com', password: 'password' })
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });

  it('Should create an article', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-access-token', authorToken)
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
      .set('x-access-token', userToken)
      .send(report)
      .end((err, res) => {
        reportId = res.body.report.id;
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.report).to.be.have.property('approve');
        expect(res.body.report).to.be.have.property('title');
        expect(res.body.report).to.be.have.property('body');
        done();
      });
  });

  it('Should not create a report', (done) => {
    chai.request(app)
      .post('/api/v1/articles/slug-title-123/reports')
      .set('x-access-token', userToken)
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.have.property('status');
        expect(res.body).to.be.have.property('message');
        done();
      });
  });

  it('Should edit a report', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${articleSlug}/reports/${reportId}/edit`)
      .set('x-access-token', userToken)
      .send(editReport)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.report).to.be.have.property('approve');
        expect(res.body.report).to.be.have.property('title');
        expect(res.body.report).to.be.have.property('body');
        done();
      });
  });

  it('Should approve a report', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${articleSlug}/reports/${reportId}/approve`)
      .set('x-access-token', adminToken)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.report).to.be.have.property('approve');
        expect(res.body.report).to.be.have.property('title');
        expect(res.body.report).to.be.have.property('body');
        done();
      });
  });

  it('Should get all approve report for an article', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${articleSlug}/reports/approve`)
      .set('x-access-token', adminToken)
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

  it('Should get all disapprove report for an article', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${articleSlug}/reports/disapprove`)
      .set('x-access-token', adminToken)
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

  it('Should get all disapprove report for an article', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${articleSlug}/reports/disapprove`)
      .set('x-access-token', adminToken)
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

  it('Should get all approve report', (done) => {
    chai.request(app)
      .get('/api/v1/reports/approve')
      .set('x-access-token', adminToken)
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

  it('Should get all disapprove report', (done) => {
    chai.request(app)
      .get('/api/v1/reports/disapprove')
      .set('x-access-token', adminToken)
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

  it('Should not be able to delete reported article if role is User', (done) => {
    chai.request(app)
      .delete(`/api/v1/admins/articles/${articleSlug}/reports`)
      .set('x-access-token', userToken)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('No Permission to Access this Resources');
        done();
      });
  });

  it('Should not be able to delete reported article if role is Author', (done) => {
    chai.request(app)
      .delete(`/api/v1/admins/articles/${articleSlug}/reports`)
      .set('x-access-token', authorToken)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('No Permission to Access this Resources');
        done();
      });
  });

  it('Should return no article found if Admin trys to delete no-existing article', (done) => {
    chai.request(app)
      .delete('/api/v1/admins/articles/node-for-beginners/reports')
      .set('x-access-token', adminToken)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('article does not exist');
        done();
      });
  });

  it('Should be able to delete reported article if role is Admin', (done) => {
    chai.request(app)
      .delete(`/api/v1/admins/articles/${articleSlug}/reports`)
      .set('x-access-token', adminToken)
      .send(report)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
  });
});
