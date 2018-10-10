import { expect } from 'chai';
import db from '../models';


const comment = {
  comment: 'comment test',
};


describe('Comment model validation', () => {
  it('should not create a comment', () => {
    db.ArticleComment.create(comment)
      .catch((error) => {
        expect(error.message).to.equal('null value in column "userId" violates not-null constraint');
      });
  });

  it('should not update a comment', () => {
    db.ArticleComment.update({ comment }, { where: { id: 100 } })
      .catch((error) => {
        expect(error.message).to.equal('string violation: comment cannot be an array or an object');
      });
  });

  it('should not get comment', () => {
    db.ArticleComment.findOne({ where: { id: 100 } })
      .catch((error) => {
        expect(error.message).to.equal('null value in column "userId" violates not-null constraint');
      });
  });
});


describe('Reply model validation', () => {
  it('should not create a comment', () => {
    db.Reply.create(comment)
      .catch((error) => {
        expect(error.message).to.equal('null value in column "userId" violates not-null constraint');
      });
  });

  it('should not update a comment', () => {
    db.Reply.update({ comment }, { where: { id: 100 } })
      .catch((error) => {
        expect(error.message).to.equal('string violation: comment cannot be an array or an object');
      });
  });

  it('should not get comment', () => {
    db.Reply.findOne({ where: { id: 100 } })
      .catch((error) => {
        expect(error.message).to.equal('null value in column "userId" violates not-null constraint');
      });
  });
});
