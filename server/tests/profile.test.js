import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
let token = '';
const wrongToken = 'jkuyhgbnjhgvbnjhgvbnjhgvb';
const user = {
  username: 'nelson@nnaji.comgj',
  email: 'nelson@nnaji.comgu',
  password: 'player009'
};

describe('Users', () => {
  it('Should should create create', (done) => {
    chai.request(app)
      .post('/api/v1/profile')
      .send(user)
      .end((err, res) => {
        token = res.body;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


