import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const user = {
  username: 'nelson@nnaji.comgj',
  email: 'nelson@nnaji.comgu',
  password: 'player009'
};

describe('Users', () => {
  it('Should signup a user', (done) => {
    chai.request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('token');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
