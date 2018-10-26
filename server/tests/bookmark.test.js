/* eslint-disable prefer-destructuring */
import faker from 'faker';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

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
let articleId;

let token = '';

describe('Bookmarks', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        chai.request(app)
          .post('/api/v1/articles')
          .set('x-access-token', token)
          .send(article)
          .end((err, res) => {
            articleId = res.body.article.id;
            done();
          });
      });
  });

  it('Should create a bookmark if it does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/bookmarks')
      .set('x-access-token', token)
      .send({ articleId })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('This article has been bookmarked');
        done();
      });
  });

  it('Should re-bookmark if already bookmarked', (done) => {
    chai.request(app)
      .post('/api/v1/bookmarks')
      .set('x-access-token', token)
      .send({ articleId })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('You already bookmarked this article');
        done();
      });
  });

  it('Should get all user bookmarks', (done) => {
    chai.request(app)
      .get('/api/v1/bookmarks')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('bookmarks retrieved successfully');
        done();
      });
  });

  it('Should delete a bookmark', (done) => {
    chai.request(app)
      .delete('/api/v1/bookmarks')
      .set('x-access-token', token)
      .send({ articleId })
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
