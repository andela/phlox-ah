import { expect } from 'chai';
import db from '../models';


const validProfile = {
  firstName: 'testFirst',
  lastName: 'testFirst',
  contact: 'Oshodi, Lagos',
  gender: 'male',
  bio: 'Sit ipsa atque voluptatem tempora totam! Nihil sunt laborum soluta',
};


describe('Create profile validation', () => {
  it('should not create profile', () => {
    db.Profile.create(validProfile)
      .catch((error) => {
        expect(error.message).to.equal('null value in column "userId" violates not-null constraint');
      });
  });
});

describe('Update profile validation', () => {
  it('should not update profile', () => {
    db.Profile.update(validProfile, {
      where: {
        id: 1
      }
    })
      .catch((error) => {
        expect(error.message).to.equal('null value in column "userId" violates not-null constraint');
      });
  });
});

describe('Update profile validation', () => {
  it('should not update profile', () => {
    db.Profile.update(validProfile, {
      where: {
        id: 1
      }
    })
      .catch((error) => {
        expect(error.message).to.equal('null value in column "userId" violates not-null constraint');
      });
  });
});

describe('Get profile validation', () => {
  it('should not get profile', () => {
    db.Profile.findOne({
      where: {
        id: 1
      }
    })
      .catch((error) => {
        expect(error.message).to.equal('null value in column "userId" violates not-null constraint');
      });
  });
});

describe('Get all profile validation', () => {
  it('should not get all profile', () => {
    db.Profile.findAll({
      where: {
        userId: 'random'
      }
    })
      .catch((error) => {
        expect(error.message).to.equal('invalid input syntax for integer: "random"');
      });
  });
});
