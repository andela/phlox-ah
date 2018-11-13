/* eslint-disable prefer-destructuring */
import faker from 'faker';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const slug = 'title-of-article1';

let token = '';

const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'Password1!'
};

describe('Likes', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('Should like an article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/like`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('you liked this article');
        done();
      });
  });
  it('Should unlike an article if it has been liked before', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/like`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('you unliked this article');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should like an article if it has been unliked before', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/like`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('you liked this article');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should not like an invalid article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}00/like`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('article does not exist');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should dislike an article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/dislike`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('you disliked this article');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should unlike an article if it has been disliked before', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/dislike`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('you unliked this article');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should not dislike an invalid article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}00/dislike`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('article does not exist');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should like a comment', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/comments/1/like`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('you liked this comment');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should unlike a comment if it has been liked before', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/comments/1/like`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('you unliked this comment');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should like a comment if it has been unliked before', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/comments/1/like`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('you liked this comment');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should not like an invalid comment', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}00/comments/1587/like`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('comment does not exist');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should dislike a comment', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/comments/1/dislike`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('you disliked this comment');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should unlike a comment if it has been disliked before', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/comments/1/dislike`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('you unliked this comment');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should not dislike an invalid comment', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}00/comments/1557/dislike`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('comment does not exist');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should like a reply', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/comments/1/reply/1/like`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('you liked this reply');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should unlike a reply if it has been liked before', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/comments/1/reply/1/like`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('you unliked this reply');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should like a comment if it has been unliked before', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/comments/1/reply/1/like`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('you liked this reply');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should not like an invalid reply', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}00/comments/1/reply/1787/like`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('reply does not exist');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should dislike a reply', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/comments/1/reply/1/dislike`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('you disliked this reply');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should unlike a reply if it has been disliked before', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}/comments/1/reply/1/dislike`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('you unliked this reply');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Should not dislike an invalid reply', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${slug}00/comments/1/reply/1678/dislike`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('reply does not exist');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
