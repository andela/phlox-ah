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
  tags: []
};

const comment = {
  comment: 'I like this article',
};

let articleSlug;
let token = '';
let commentId;
let commentArticleSlug;

describe('CommentsHistory', () => {
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
            articleSlug = res.body.article.slug;
            chai.request(app)
              .post(`/api/v1/articles/${articleSlug}/comments`)
              .set('x-access-token', token)
              .send(comment)
              .end((err, res) => {
                commentId = res.body.comment.id;
                commentArticleSlug = res.body.comment.articleSlug;
                done();
              });
          });
      });
  });

  it('Should create a comment history of an article', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${commentArticleSlug}/comments/${commentId}/edit`)
      .set('x-access-token', token)
      .send({ comment: 'This is an updated comment' })
      .end(() => {
        chai.request(app)
          .get(`/api/v1/articles/${articleSlug}/comments/${commentId}/myhistory`)
          .set('x-access-token', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.be.equal('comment history retrieved');
            expect(res.body.histories).to.be.an('array');
            expect(res.body.histories[0].comment).to.be.equal('I like this article');
            done();
          });
      });
  });

  it('Should get comment history of an article for all users', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${articleSlug}/comments/${commentId}/allhistory`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('all comment histories retrieved');
        expect(res.body.histories).to.be.an('array');
        expect(res.body.histories[0].comment).to.be.equal('I like this article');
        done();
      });
  });
});
