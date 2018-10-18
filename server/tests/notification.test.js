/* eslint-disable prefer-destructuring */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import Model from '../models';
import Authenticator from '../middlewares/authenticator';

chai.use(chaiHttp);
const token = Authenticator.generateToken({ id: 1, username: 'johndoe', email: 'janedoe@something.com' });
describe('Notification', () => {
  before((done) => {
    Model.Notification.create({
      userId: 1,
      articleSlug: 'some-test-slug0923',
      message: 'test notification message'
    })
      .then(() => done())
      .catch(e => console.log(e));
  });

  describe('get notifications', () => {
    it('should return list of user\'s notifications', (done) => {
      chai.request(app)
        .get('/api/v1/notifications')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });

  describe('get unread notifications', () => {
    it('should return list of  unread user\'s notifications', (done) => {
      chai.request(app)
        .get('/api/v1/notifications/unseen')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });

  describe('Mark a notification as unseen/seen', () => {
    it('should mark a notification as unseen', (done) => {
      chai.request(app)
        .put('/api/v1/notifications/seen/1')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('successfully marked as seen');
          done();
        });
    });
    it('should mark a notification as unseen', (done) => {
      chai.request(app)
        .put('/api/v1/notifications/unseen/1')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('successfully marked as unseen');
          done();
        });
    });
  });

  describe('Opt in/out of email notification', () => {
    it('should Optout of email notification', (done) => {
      chai.request(app)
        .put('/api/v1/notifications/optout')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('successfully opted out of notification');
          done();
        });
    });
    it('should Opt into of email notification', (done) => {
      chai.request(app)
        .put('/api/v1/notifications/optin')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('successfully opted in to notification');
          done();
        });
    });
  });
});
