/* eslint-disable prefer-destructuring */
import faker from 'faker';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

let slug = '';

const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'password'
};

const article = {
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  description: 'This is the description',
  tags: []
};

const noTitle = {
  body: faker.random.words(),
  description: faker.random.words(),
  tags: []
};

const noBody = {
  title: faker.random.words(),
  description: faker.random.words(),
  tags: []
};

const noDescription = {
  title: faker.random.words(),
  body: faker.random.words(),
  tags: []
};

let token = '';

describe('Articles', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('Should create an article', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-access-token', token)
      .send(article)
      .end((err, res) => {
        slug = res.body.article.slug;
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should get a specific article', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${slug}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should not get an article with an invalid slug', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${slug}00`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should get all articles', (done) => {
    chai.request(app)
      .get('/api/v1/articles/feed')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should get articles of logged in users', (done) => {
    chai.request(app)
      .get('/api/v1/articles')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should not update an invalid article', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${slug}00`)
      .set('x-access-token', token)
      .send(article)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should update an article', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${slug}`)
      .set('x-access-token', token)
      .send(article)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should like an article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/like`)
      .set('x-access-token', token)
      .send(article)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should not like an invalid article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}00/like`)
      .set('x-access-token', token)
      .send(article)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should delete a users article', (done) => {
    chai.request(app)
      .delete(`/api/v1/articles/${slug}`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should not delete an invalid article', (done) => {
    chai.request(app)
      .delete(`/api/v1/articles/${slug}00`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should not create an article if title is empty', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-access-token', token)
      .send(noTitle)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body).to.not.have.property('token');
        expect(res.body.message).to.be.an('array').that.include('title is required');
        done();
      });
  });

  it('Should not create an article if body is empty', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-access-token', token)
      .send(noBody)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body).to.not.have.property('token');
        expect(res.body.message).to.be.an('array').that.include('body is required');
        done();
      });
  });

  it('Should not create an article if description is empty', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-access-token', token)
      .send(noDescription)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body).to.not.have.property('token');
        expect(res.body.message).to.be.an('array').that.include('description is required');
        done();
      });
  });
});
