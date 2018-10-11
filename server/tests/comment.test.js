import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

let token = '';
let articleSlug = '';
let commentId = null;
let replyCommentId = null;

const user = {
  username: 'dimeji19',
  email: 'dimeji01@ola.com',
  password: 'password009'
};


const article = {
  title: 'How to use the faker package',
  body: 'faker.js contains a super useful generator method Faker.fake for combining faker API methods using a mustache string format.',
  description: 'Fake package is an handy package when it comes to generation random data.'
};


const comment = {
  comment: 'comment test',
};

const modifiedComment = {
  comment: 'comment test modified',
};

describe('Comment', () => {
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
        done();
      });
  });

  it('Should add comment to an article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${articleSlug}/comments`)
      .set('x-access-token', token)
      .send(comment)
      .end((err, res) => {
        commentId = res.body.comment.id;
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should not add comment to an article', (done) => {
    chai.request(app)
      .post('/api/v1/articles/non-existing-slug/comments')
      .set('x-access-token', token)
      .send(comment)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should modify an article comment', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${articleSlug}/comments/${commentId}/edit`)
      .set('x-access-token', token)
      .send(modifiedComment)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should not modify an article comment', (done) => {
    chai.request(app)
      .put('/api/v1/articles/non-existing-slug/comments/100/edit')
      .set('x-access-token', token)
      .send(comment)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should add reply to an article comment', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${articleSlug}/comments/${commentId}/reply`)
      .set('x-access-token', token)
      .send(comment)
      .end((err, res) => {
        replyCommentId = res.body.comment.id;
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should not add reply to an article comment', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${articleSlug}/comments/100/reply`)
      .set('x-access-token', token)
      .send(comment)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should modify an added reply of an article comment', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${articleSlug}/comments/${commentId}/reply/${replyCommentId}/edit`)
      .set('x-access-token', token)
      .send(modifiedComment)
      .end((err, res) => {
        replyCommentId = res.body.comment.id;
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
