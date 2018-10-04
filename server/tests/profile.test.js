import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

let token = '';
let profileId = null;

const user = {
  username: 'dimeji@ola.com',
  email: 'dimeji@ola.com',
  password: 'password009'
};

const profileDetail = {
  firstName: 'testFirst',
  lastName: 'testFirst',
  contact: 'Oshodi, Lagos',
  gender: 'male',
  bio: 'Sit ipsa atque voluptatem tempora totam! Nihil sunt laborum soluta',
};

describe('Users', () => {
  before((done) => {
    chai.request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        const { token: validToken } = res.body;
        token = validToken;
        done();
      });
  });

  it('should not access create profile route without any token', (done) => {
    chai.request(app)
      .post('/api/v1/profile')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(403);
        expect(res.body.success).to.equals(false);
        expect(res.body.message).to.equals('Missing Token');
        done();
      });
  });

  it('should not access update profile route without any token', (done) => {
    chai.request(app)
      .put('/api/v1/profile/1')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(403);
        expect(res.body.success).to.equals(false);
        expect(res.body.message).to.equals('Missing Token');
        done();
      });
  });

  it('should not access get profile route without any token', (done) => {
    chai.request(app)
      .get('/api/v1/profile')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(403);
        expect(res.body.success).to.equals(false);
        expect(res.body.message).to.equals('Missing Token');
        done();
      });
  });

  it('should not access get all profile route without any token', (done) => {
    chai.request(app)
      .get('/api/v1/profiles')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(403);
        expect(res.body.success).to.equals(false);
        expect(res.body.message).to.equals('Missing Token');
        done();
      });
  });

  it('should not access get profile by id route without any token', (done) => {
    chai.request(app)
      .get('/api/v1/profile/1')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(403);
        expect(res.body.success).to.equals(false);
        expect(res.body.message).to.equals('Missing Token');
        done();
      });
  });


  it('should be able to create profile', (done) => {
    chai.request(app)
      .post('/api/v1/profile')
      .set('x-access-token', token)
      .send(profileDetail)
      .end((err, res) => {
        profileId = res.body.profile.id;
        expect(res).to.have.status(201);
        expect(res.body.success).to.equals(true);
        expect(res.body.message).to.equals('Profile created successfully');
        expect(res.body).to.be.an('object');
        expect(res.body.profile).to.be.an('object');
        expect(res.body.profile).to.have.property('firstName');
        expect(res.body.profile).to.have.property('lastName');
        expect(res.body.profile).to.have.property('contact');
        expect(res.body.profile).to.have.property('gender');
        expect(res.body.profile).to.have.property('bio');
        expect(res.body.profile).to.have.property('profileImage');
        done();
      });
  });


  it('should be able to update profile by profile id', (done) => {
    chai.request(app)
      .put(`/api/v1/profile/${profileId}`)
      .set('x-access-token', token)
      .send({ firstName: 'nameChanged', gender: 'female' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equals(true);
        expect(res.body.message).to.equals('Profile updated successfully');
        expect(res.body).to.be.an('object');
        expect(res.body.profile).to.be.an('object');
        expect(res.body.profile).to.have.property('firstName');
        expect(res.body.profile).to.have.property('lastName');
        expect(res.body.profile).to.have.property('contact');
        expect(res.body.profile).to.have.property('gender');
        expect(res.body.profile).to.have.property('bio');
        expect(res.body.profile).to.have.property('profileImage');
        done();
      });
  });


  it('should be able to update profile', (done) => {
    chai.request(app)
      .post('/api/v1/profile')
      .set('x-access-token', token)
      .send({ lastName: 'nameChanged2', gender: 'female' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equals(true);
        expect(res.body.message).to.equals('Profile updated successfully');
        expect(res.body).to.be.an('object');
        expect(res.body.profile).to.be.an('object');
        expect(res.body.profile).to.have.property('firstName');
        expect(res.body.profile).to.have.property('lastName');
        expect(res.body.profile).to.have.property('contact');
        expect(res.body.profile).to.have.property('gender');
        expect(res.body.profile).to.have.property('bio');
        expect(res.body.profile).to.have.property('profileImage');
        done();
      });
  });

  it('should be able to get profile', (done) => {
    chai.request(app)
      .get('/api/v1/profile')
      .set('x-access-token', token)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equals(true);
        expect(res.body.message).to.equals('Profile fetched successfully');
        expect(res.body).to.be.an('object');
        expect(res.body.profile).to.be.an('object');
        expect(res.body.profile).to.have.property('firstName');
        expect(res.body.profile).to.have.property('lastName');
        expect(res.body.profile).to.have.property('contact');
        expect(res.body.profile).to.have.property('gender');
        expect(res.body.profile).to.have.property('bio');
        expect(res.body.profile).to.have.property('profileImage');
        done();
      });
  });

  it('should be able to get profile by profile id', (done) => {
    chai.request(app)
      .get(`/api/v1/profile/${profileId}`)
      .set('x-access-token', token)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equals(true);
        expect(res.body.message).to.equals('Profile fetched successfully');
        expect(res.body).to.be.an('object');
        expect(res.body.profile).to.be.an('object');
        expect(res.body.profile).to.have.property('firstName');
        expect(res.body.profile).to.have.property('lastName');
        expect(res.body.profile).to.have.property('contact');
        expect(res.body.profile).to.have.property('gender');
        expect(res.body.profile).to.have.property('bio');
        expect(res.body.profile).to.have.property('profileImage');
        done();
      });
  });

  it('should be able to get all profile', (done) => {
    chai.request(app)
      .get('/api/v1/profiles')
      .set('x-access-token', token)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equals(true);
        expect(res.body.message).to.equals('Profiles fetched successfully');
        expect(res.body).to.be.an('object');
        expect(res.body.profiles).to.be.an('array');
        done();
      });
  });
});
