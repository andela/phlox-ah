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
  tags: [],
  categoryId: 3
};

const publishedArticle = {
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  description: 'This is the description',
  tags: [],
  categoryId: 3,
  status: 'published'
};

const articleWithWrongStatus = {
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  description: 'This is the description',
  tags: [],
  categoryId: 3,
  status: 'active'
};

const noTitle = {
  body: faker.lorem.paragraph(),
  description: faker.lorem.sentence(),
  tags: [],
  categoryId: 3
};

const noBody = {
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  tags: [],
  categoryId: 3
};

const noDescription = {
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  tags: [],
  categoryId: 3
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

  it('Should create an article as draft', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-access-token', token)
      .send(article)
      .end((err, res) => {
        slug = res.body.article.slug;
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.article.status).to.be.equal('draft');
        done();
      });
  });
  it('Should not update an article with invalid status', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${slug}`)
      .set('x-access-token', token)
      .send(articleWithWrongStatus)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body.errors[0].message).to.be.equal('status must be either draft or published');
        done();
      });
  });
  it('Should update an article to publish', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${slug}`)
      .set('x-access-token', token)
      .send(publishedArticle)
      .end((err, res) => {
        slug = res.body.article.slug;
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.article.status).to.be.equal('published');
        done();
      });
  });
  it('Should get a specific article for', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${slug}`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should get a specific article and add logged in user view choice', (done) => {
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
  it('Should get all articles and the number of pages', (done) => {
    chai.request(app)
      .get('/api/v1/articles/feed?page=1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('pages');
        expect(res.body).to.have.property('articles');
        done();
      });
  });
  it('Should get articles of logged in users', (done) => {
    chai.request(app)
      .get('/api/v1/myarticles')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should get articles of logged in users when status is sent', (done) => {
    chai.request(app)
      .get('/api/v1/myarticles/published')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.articles[0].status).to.be.equal('published');
        done();
      });
  });
  it('Should get articles of logged in users and the number of pages', (done) => {
    chai.request(app)
      .get('/api/v1/myarticles?page=1')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('pages');
        expect(res.body).to.have.property('articles');
        done();
      });
  });
  it('Should not get articles for a wrong page number', (done) => {
    chai.request(app)
      .get('/api/v1/myarticles?page=abc')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('pages');
        expect(res.body).to.have.property('articles');
        done();
      });
  });
  it('Should not get articles for a wrong page number', (done) => {
    chai.request(app)
      .get('/api/v1/articles/feed?page=abc')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('pages');
        expect(res.body).to.have.property('articles');
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
