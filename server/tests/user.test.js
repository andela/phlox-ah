import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Users', () => {
  const user = {
    email: 'sam@sammy.com',
    password: 'password'
  };

  it('Should signup a user', (done) => {
    chai.request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
