import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

let userToken;
let adminToken;
let authorToken;
const validInput = {
  userId: 2,
  role: 'Author'
};

describe('Admin', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/login')
      .send({ emailOrUsername: 'jane@something.com', password: 'password' })
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/login')
      .send({ emailOrUsername: 'jack@something.com', password: 'password' })
      .end((err, res) => {
        authorToken = res.body.token;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/login')
      .send({ emailOrUsername: 'jackson@something.com', password: 'password' })
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });

  describe('When user does not have permission', () => {
    it('should denied permission if user role is User', (done) => {
      chai.request(app)
        .post('/api/v1/admins/setRole')
        .set('x-access-token', userToken)
        .send(validInput)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('No Permission to Access this Resources');
          done();
        });
    });

    it('should denied permission if user role is Author', (done) => {
      chai.request(app)
        .post('/api/v1/admins/setRole')
        .set('x-access-token', authorToken)
        .send(validInput)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('No Permission to Access this Resources');
          done();
        });
    });
  });

  describe('When user have permission', () => {
    it('should set role if user role is Admin', (done) => {
      chai.request(app)
        .post('/api/v1/admins/setRole')
        .set('x-access-token', adminToken)
        .send(validInput)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal(`Successfully Changed User to ${validInput.role}`);
          done();
        });
    });
  });

  describe('When user does not exist', () => {
    it('should return no user found', (done) => {
      chai.request(app)
        .post('/api/v1/admins/setRole')
        .set('x-access-token', adminToken)
        .send({ userId: 599, role: 'Author' })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('No User Found');
          done();
        });
    });
  });

  describe('When role input is invalid', () => {
    it('should return invalid role input', (done) => {
      chai.request(app)
        .post('/api/v1/admins/setRole')
        .set('x-access-token', adminToken)
        .send({ userId: 2, role: 'Auth' })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(422);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Invalid role input');
          done();
        });
    });
  });
});
