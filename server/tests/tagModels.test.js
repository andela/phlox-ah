import { expect } from 'chai';
import db from '../models';

const validTag = { name: 'sports' };
const invalidTag = { title: 'sports' };
let tag = '';
let nameError = '';

describe('Tag model validations', () => {
  it('should create a new tag', (done) => {
    db.Tag.create(validTag)
      .then((newTag) => {
        tag = newTag;
        done();
      });
  });

  it('should create a tag with name', () => {
    expect(tag.name).to.equal(validTag.name);
  });

  describe('Validate name', () => {
    db.Tag.create(invalidTag)
      .catch((error) => {
        nameError = error.message;
      });
    it('should ensure that name is not null', () => {
      expect(nameError).to.equal('notNull Violation: Tag.name cannot be null');
    });
  });
});
