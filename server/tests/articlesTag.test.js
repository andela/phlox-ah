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

const validArticle = {
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  description: 'This is the description',
  tags: []
};

let token = '';

describe('ArticleTags', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        chai.request(app)
          .post('/api/v1/articles')
          .set('x-access-token', token)
          .send(validArticle)
          .end(() => {
            done();
          });
      });
  });

  it('Should create an article tag', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-access-token', token)
      .send(validArticle)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
