/* eslint-disable prefer-destructuring */
import faker from 'faker';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import db from '../models';
import app from '../index';

chai.use(chaiHttp);

const hash = bcrypt.hashSync('Password1!', 10);

const verifyUser = {
  username: faker.internet.userName(),
  email: faker.internet.email().toLowerCase(),
  password: 'Password1!',
  verifyToken: faker.random.uuid()
};

const verifiedUser = {
  username: faker.internet.userName(),
  email: 'frank@gmail.com',
  password: hash,
  isVerified: true
};

const testUser = {
  username: faker.internet.userName(),
  email: 'john.doe@gmail.com',
  password: 'Password1!',
  resetToken: 'e4d67ba83bfb46e42d6397a2a325cf0bd',
  expireAt: new Date(new Date().getTime() + (10 * 60 * 1000)),
};

const user = {
  username: 'testuser',
  email: 'testuser@andela.com',
  password: 'Password1!'
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

  before((done) => {
    db.User.create(testUser)
      .then(() => {
        done();
      });
  });

  // create a verified user account
  before((done) => {
    db.User.create(verifiedUser)
      .then(() => {
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
          expect(res.body.message).to.be.an('array').that.include('Password must contain a minimum of 1 uppercase letter, 1 lowercase letter, 1 number and must be at least 8 characters');
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
          expect(res.body.message).to.be.an('array').that.include('Password must contain a minimum of 1 uppercase letter, 1 lowercase letter, 1 number and must be at least 8 characters');
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
          expect(res.body.message).to.be.an('array').that.include('Password must contain a minimum of 1 uppercase letter, 1 lowercase letter, 1 number and must be at least 8 characters');
          done();
        });
    });

    it('Should not signup a user if username is less than 2 characters', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          username: 'u',
          email: faker.internet.email(),
          password: 'Password!'
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
          password: 'Password1!'
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
          password: 'Password1!'
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
          password: 'Password1!'
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

  describe('Password Reset', () => {
    it('Should successfully reset user password', (done) => {
      chai.request(app)
        .put(`/api/v1/reset_password/${testUser.resetToken}`)
        .send({ password: 'newPassword1!' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Password has been successfully updated');
          done();
        });
    });

    it('Should return error message if link is wrong', (done) => {
      chai.request(app)
        .put('/api/v1/reset_password/e4d67ba83bfb46e42d6397a2a325cf0bsawefrsawrf')
        .send({ password: 'newPassword1!' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('This link is invalid');
          done();
        });
    });

    it('should send the user url for password reset', (done) => {
      chai.request(app)
        .post('/api/v1/forgetPassword')
        .send({ email: testUser.email })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('A password reset link has been sent to your email');
          done();
        });
    });

    it('Should return an error if email is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/forgetPassword')
        .send({
          email: 'sample@example.com'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Email address is not registered');
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
    it('should not login a user if the user has not verify their account', (done) => {
      chai.request(app)
        .post('/api/v1/login')
        .send({ emailOrUsername: 'testuser', password: 'password' })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Please verify your account');
          done();
        });
    });

    it('should login a user and return a token', (done) => {
      chai.request(app)
        .post('/api/v1/login')
        .send({ emailOrUsername: 'frank@gmail.com', password: 'Password1!' })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('Should return error message when user tries to login in with invalid email/username', (done) => {
      chai.request(app)
        .post('/api/v1/login')
        .send({ emailOrUsername: 'wronguser', password: 'Password!' })
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
        .send({ emailOrUsername: 'frank@gmail.com', password: 'wrongpassword' })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Invalid Email/Username or password');
          done();
        });
    });
  });

  describe('User follow/unfollow', () => {
    it('should return success message and follow a user', (done) => {
      chai.request(app)
        .post(`/api/v1/profiles/${testUser.username}/follow`)
        .set('x-access-token', token)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql(`You are now following ${testUser.username}`);
          done();
        });
    });

    it('should return error message if user is not found', (done) => {
      chai.request(app)
        .post('/api/v1/profiles/unknown/follow')
        .set('x-access-token', token)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.eql('User not found');
          done();
        });
    });

    it('should return error message if user tries to follow himself', (done) => {
      chai.request(app)
        .post('/api/v1/profiles/testuser/follow')
        .set('x-access-token', token)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.message).to.eql('You cannot follow yourself');
          done();
        });
    });

    it('should return error message if user already follows user', (done) => {
      chai.request(app)
        .post(`/api/v1/profiles/${testUser.username}/follow`)
        .set('x-access-token', token)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql(`You already follow ${testUser.username}`);
          done();
        });
    });

    it('should return error message if user is not found', (done) => {
      chai.request(app)
        .delete('/api/v1/profiles/unknown/follow')
        .set('x-access-token', token)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.eql('User not found');
          done();
        });
    });

    it('should return error message if user tries to unfollow himself', (done) => {
      chai.request(app)
        .delete('/api/v1/profiles/testuser/follow')
        .set('x-access-token', token)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.message).to.eql('You cannot unfollow yourself');
          done();
        });
    });

    it('should return error message if user doesnt follow user', (done) => {
      chai.request(app)
        .delete('/api/v1/profiles/dimeji/follow')
        .set('x-access-token', token)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('You are not following dimeji');
          done();
        });
    });

    it('should return success message and unfollow a user', (done) => {
      chai.request(app)
        .delete(`/api/v1/profiles/${testUser.username}/follow`)
        .set('x-access-token', token)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql(`You are no longer following ${testUser.username}`);
          done();
        });
    });
  });

  describe('User Followers/Following', () => {
    it('should return a list of users following and followers', (done) => {
      chai.request(app)
        .get('/api/v1/followings')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('Follows/Followers');
          expect(res.body.following).to.be.an('array');
          expect(res.body.followers).to.be.an('array');
          done();
        });
    });
  });

  describe('List Users', () => {
    it('should list all authors and their profile', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.users[0]).to.have.property('Profile');
          expect(res.body.message).to.equal('users retrieved successfully');
          done();
        });
    });

    it('should get a user with profile details', (done) => {
      chai.request(app)
        .get('/api/v1/users/johndoe')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('user details retrieved successfully');
          done();
        });
    });
    it('should not get profile details of invalid', (done) => {
      chai.request(app)
        .get('/api/v1/users/johndoesss')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('user does not exist');
          done();
        });
    });
  });
});
