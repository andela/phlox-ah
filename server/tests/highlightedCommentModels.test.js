import { expect } from 'chai';
import db from '../models';
import {
  validHighlight, noArticleSlug, noUserId, noSelectedText, noComment
} from '../helpers/highlightAndComment';

let highlight;
let userIdError;
let articleSlugError;
let commentError;
let selectedTextError;

describe('Highlight Comment model validation', () => {
  it('should create a highlighted comment', (done) => {
    db.HighlightAndComment.create(validHighlight)
      .then((newHighlightedComment) => {
        highlight = newHighlightedComment;
        done();
      }).timeout(20000);
  });

  it('should create a bookmark with articleId and userId', () => {
    expect(highlight.articleSlug).to.equal(validHighlight.articleSlug);
    expect(highlight.userId).to.equal(validHighlight.userId);
    expect(highlight.selectedText).to.equal(validHighlight.selectedText);
    expect(highlight.comment).to.equal(validHighlight.comment);
  });

  describe('Validate articleSlug', () => {
    db.HighlightAndComment.create(noArticleSlug)
      .catch((error) => {
        articleSlugError = error.message;
      });
    it('should ensure that artcle slug is not null', () => {
      expect(articleSlugError).to.equal('notNull Violation: HighlightAndComment.articleSlug cannot be null');
    });
  });

  describe('Validate userId', () => {
    db.HighlightAndComment.create(noUserId)
      .catch((error) => {
        userIdError = error.message;
      });
    it('should ensure that user id is not null', () => {
      expect(userIdError).to.equal('notNull Violation: HighlightAndComment.userId cannot be null');
    });
  });

  describe('Validate selectedText', () => {
    db.HighlightAndComment.create(noSelectedText)
      .catch((error) => {
        selectedTextError = error.message;
      });
    it('should ensure that selectedText is not null', () => {
      expect(selectedTextError).to.equal('notNull Violation: HighlightAndComment.selectedText cannot be null');
    });
  });

  describe('Validate comment', () => {
    db.HighlightAndComment.create(noComment)
      .catch((error) => {
        commentError = error.message;
      });
    it('should ensure that comment is not null', () => {
      expect(commentError).to.equal('notNull Violation: HighlightAndComment.comment cannot be null');
    });
  });
});
