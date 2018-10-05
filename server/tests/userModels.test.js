import faker from 'faker';
import { expect } from 'chai';
import db from '../models';


const validUser = {
  username: faker.internet.userName(),
  email: faker.internet.email().toLowerCase(),
  password: 'password'
};

const invalidEmail = {
  username: faker.internet.userName(),
  email: 'invalidEmail',
  password: 'password'
};

const noUsername = {
  email: faker.internet.email(),
  password: 'password'
};

const noPassword = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
};

let user;
let emailError;
let usernameError;
let passwordError;


describe('User model validations', () => {
  it('should create new user', (done) => {
    db.User.create(validUser)
      .then((newUser) => {
        user = newUser;
        done();
      });
  });

  it('should create a user with username, email and password', () => {
    expect(user.username).to.equal(validUser.username);
    expect(user.email).to.equal(validUser.email);
    expect(user.password).to.equal(validUser.password);
  });

  describe('Email validation', () => {
    db.User.create(invalidEmail)
      .catch((error) => {
        emailError = error;
      });
    it('should ensure that email is  valid', () => {
      const errorMessages = [];
      emailError.errors.forEach(e => errorMessages.push(e.message));
      expect(errorMessages).to.be.an('array').that.include('email must be a valid email');
    });
  });

  describe('Username validation', () => {
    db.User.create(noUsername)
      .catch((error) => {
        usernameError = error;
      });
    it('should ensure that username is not null', () => {
      const errorMessages = [];
      usernameError.errors.forEach(e => errorMessages.push(e.message));
      expect(errorMessages).to.be.an('array').that.include('User.username cannot be null');
    });
  });

  describe('Password validation', () => {
    db.User.create(noPassword)
      .catch((error) => {
        passwordError = error;
      });
    it('should ensure that password is not null', () => {
      const errorMessages = [];
      passwordError.errors.forEach(e => errorMessages.push(e.message));
      expect(errorMessages).to.be.an('array').that.include('User.password cannot be null');
    });
  });
});
