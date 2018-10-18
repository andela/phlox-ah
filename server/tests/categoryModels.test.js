import { expect } from 'chai';
import db from '../models';


const validCategory = {
  category: 'aircraft',
};

const noCategory = {
  category: null
};

const invalidCategory = {
  category: 1
};

let category;
let categoryError;
let stringError;

describe('Category model validations', () => {
  it('should create categoryt', (done) => {
    db.Category.create(validCategory)
      .then((newCategory) => {
        category = newCategory;
        done();
      });
  });

  it('should create category with the correct fields', () => {
    expect(category.category).to.equal(validCategory.category);
  });

  describe('category validation (null)', () => {
    db.Category.create(noCategory)
      .catch((error) => {
        categoryError = error.message;
      });
    it('should ensure that category is not null', () => {
      expect(categoryError).to.equal('null value in column "category" violates not-null constraint');
    });
  });

  describe('category validation (string)', () => {
    db.Category.create(invalidCategory)
      .catch((error) => {
        stringError = error.message;
      });
    it('should ensure that category is a string', () => {
      expect(stringError).to.equal(undefined);
    });
  });
});
