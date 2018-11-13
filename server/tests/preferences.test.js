import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

let token = '';

const user = {
  username: 'dimeji191',
  email: 'dimeji02@ola.com',
  password: 'Password1!'
};

const preferences = {
  ids: [1, 2]
};

const article = {
  title: 'How to use the faker package',
  body: 'faker.js contains a super useful generator method Faker.fake for combining faker API methods using a mustache string format.',
  description: 'Fake package is an handy package when it comes to generation random data.',
  tags: [],
  categoryId: 1,
};


describe('Preferences', () => {
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


  it('Should create preferences', (done) => {
    chai.request(app)
      .post('/api/v1/preferences')
      .set('x-access-token', token)
      .send(preferences)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should create an article', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-access-token', token)
      .send(article)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should get articles of user\'s article preferences', (done) => {
    chai.request(app)
      .get('/api/v1/articles/preferences')
      .set('x-access-token', token)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.an('array');
        expect(res.body.message[0]).to.be.have.property('Tags');
        expect(res.body.message[0]).to.be.have.property('Category');
        expect(res.body.message[0]).to.be.have.property('likes');
        done();
      });
  });
});
