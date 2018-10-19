/* eslint-disable prefer-destructuring */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { user, article } from '../helpers/highlightAndComment';


chai.use(chaiHttp);

let articleSlug;
let createdHighlightId;
let token = '';

describe('Highlight and comment', () => {
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
            done();
          });
      });
  });

  it('Should not highlight and comment text if text does not exist in article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${articleSlug}/highlight/comment`)
      .set('x-access-token', token)
      .send({ selectedText: 'wrong text', comment: 'The first comment' })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('selected text cannot be found in the article');
        done();
      });
  });

  it('Should highlight text in an article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${articleSlug}/highlight/comment`)
      .set('x-access-token', token)
      .send({ selectedText: 'the description', comment: 'The first comment' })
      .end((err, res) => {
        createdHighlightId = res.body.highlightComment.id;
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Text has been highlighted');
        expect(res.body.highlightComment.selectedText).to.be.equal('the description');
        expect(res.body.highlightComment.articleSlug).to.be.equal(articleSlug);
        done();
      });
  });

  it('Should not highlight same text twice in an article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${articleSlug}/highlight/comment`)
      .set('x-access-token', token)
      .send({ selectedText: 'the description', comment: 'The first comment' })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Text has already been highlighted');
        expect(res.body.highlightComment.selectedText).to.be.equal('the description');
        expect(res.body.highlightComment.articleSlug).to.be.equal(articleSlug);
        done();
      });
  });

  it('Should get highlighted comment', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/feed/${articleSlug}`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('article retrieved successfully');
        expect(res.body.article.highlightedComments[0].comment).to.be.equal('The first comment');
        done();
      });
  });

  it('Should update highlighted comment', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${articleSlug}/highlight/comment/${createdHighlightId}/edit`)
      .set('x-access-token', token)
      .send({ selectedText: 'the description', comment: 'The first comment has been changed' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Text comment has been changed');
        expect(res.body.updatedHighlightComment.comment).to.be.equal('The first comment has been changed');
        done();
      });
  });

  it('Should delete highlighted comment', (done) => {
    chai.request(app)
      .delete(`/api/v1/articles/${articleSlug}/highlight/comment/${createdHighlightId}/delete`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
