/* eslint-disable prefer-destructuring */
import faker from 'faker';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import db from '../models';
import app from '../index';

chai.use(chaiHttp);

const verifyUser = {
  username: faker.internet.userName(),
  email: faker.internet.email().toLowerCase(),
  password: 'password',
  verifyToken: faker.random.uuid()
};

const user = {
  username: 'testuser',
  email: 'testuser@andela.com',
  password: 'password'
};

let token = '';
let verifyToken;

describe('Users', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  // create user into the database and retrieve it verification token
  before((done) => {
    db.User.create(verifyUser)
      .then((newUser) => {
        verifyToken = newUser.dataValues.verifyToken;
        done();
      });
  });

  describe('signupUser', () => {
    it('Should not signup a user if email is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
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
        .post('/api/v1/signup')
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
        .post('/api/v1/signup')
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
        .post('/api/v1/signup')
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
        .post('/api/v1/signup')
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
        .post('/api/v1/signup')
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
        .post('/api/v1/signup')
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
        .post('/api/v1/signup')
        .send({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('token');
          expect(res.body.message).to.equal('User successfully signed up, an email is sent to your mail account, please verify your mail account to complete registration');
          done();
        });
    });

    it('Should not signup a user if email already exists', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          username: faker.internet.userName(),
          email: user.email,
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.not.have.property('token');
          expect(res.body.message).to.equal('this email already exists');
          done();
        });
    });

    it('Should not signup a user if username already exists', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          username: user.username,
          email: faker.internet.email(),
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.not.have.property('token');
          expect(res.body.message).to.equal('this username already exists');
          done();
        });
    });


    it('Should access a protected route with a valid token', (done) => {
      chai.request(app)
        .get('/api/v1/test')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should not access a protected route without any token', (done) => {
      chai.request(app)
        .get('/api/v1/test')
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(403);
          done();
        });
    });
  });

  describe('Verify User', () => {
    it('should verify user given the right verification token', (done) => {
      chai.request(app)
        .get(`/api/v1/users/verify/${verifyToken}`)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Thank you, account verified. You can login now');
          done();
        });
    });

    it('should display user is already verified when isVerified is true', (done) => {
      chai.request(app)
        .get(`/api/v1/users/verify/${verifyToken}`)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(422);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Your account is already verified');
          done();
        });
    });
  });

  describe('Login User', () => {
    it('should login a user and return a token', (done) => {
      chai.request(app)
        .post('/api/v1/login')
        .send({ emailOrUsername: 'testuser', password: 'password' })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('Should return error message when user tries to login in with invalid email/username', (done) => {
      chai.request(app)
        .post('/api/v1/login')
        .send({ emailOrUsername: 'wronguser', password: 'password' })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Invalid Email/Username or password');
          done();
        });
    });

    it('Should return error message when user tries to login in with invalid password', (done) => {
      chai.request(app)
        .post('/api/v1/login')
        .send({ emailOrUsername: 'testuser', password: 'wrongpassword' })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Invalid Email/Username or password');
          done();
        });
    });
  });
});
