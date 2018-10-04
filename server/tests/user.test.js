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

let token = '';

describe('Users', () => {
  before((done) => {
    chai.request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('signupUser', () => {
    it('Should not signup a user if email is invalid', (done) => {
      chai.request(app)
        .post('/api/signup')
        .send({
          username: faker.internet.userName(),
          email: 'sampleexample.com',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.not.have.property('token');
          expect(res.body.message).to.be.an('array').that.include('email must be a valid email');
          done();
        });
    });

    it('Should not signup a user if email is empty', (done) => {
      chai.request(app)
        .post('/api/signup')
        .send({
          username: faker.internet.userName(),
          email: '',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.not.have.property('token');
          expect(res.body.message).to.be.an('array').that.include('email is not allowed to be empty');
          done();
        });
    });

    it('Should not signup a user if username is empty', (done) => {
      chai.request(app)
        .post('/api/signup')
        .send({
          username: '',
          email: faker.internet.email(),
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.not.have.property('token');
          expect(res.body.message).to.be.an('array').that.include('username is not allowed to be empty');
          done();
        });
    });

    it('Should not signup a user if password is empty', (done) => {
      chai.request(app)
        .post('/api/signup')
        .send({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: ''
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.not.have.property('token');
          expect(res.body.message).to.be.an('array').that.include('password is not allowed to be empty');
          done();
        });
    });

    it('Should not signup a user if password is not alphanumeric', (done) => {
      chai.request(app)
        .post('/api/signup')
        .send({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: 'password!.password'
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.not.have.property('token');
          expect(res.body.message).to.be.an('array').that.include('password must only contain alpha-numeric characters');
          done();
        });
    });

    it('Should not signup a user if password is less than 8 characters', (done) => {
      chai.request(app)
        .post('/api/signup')
        .send({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: 'pass'
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.not.have.property('token');
          expect(res.body.message).to.be.an('array').that.include('password length must be at least 8 characters long');
          done();
        });
    });

    it('Should not signup a user if username is less than 2 characters', (done) => {
      chai.request(app)
        .post('/api/signup')
        .send({
          username: 'u',
          email: faker.internet.email(),
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.not.have.property('token');
          expect(res.body.message).to.be.an('array').that.include('username length must be at least 2 characters long');
          done();
        });
    });

    it('Should signup a user if details are valid', (done) => {
      chai.request(app)
        .post('/api/signup')
        .send({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('token');
          expect(res.body.message).to.equal('You have successfully signed up!');
          done();
        });
    });

    it('Should access a protected route with a valid token', (done) => {
      chai.request(app)
        .get('/api/test')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should not access a protected route without any token', (done) => {
      chai.request(app)
        .get('/api/test')
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(403);
          done();
        });
    });
  });
});
