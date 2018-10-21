import { expect } from 'chai';
import Model from '../models';

const validNotification = { userId: 1, articleSlug: 'article slug', message: 'new notification' };
const invalidNotification = { };
let notification;
let errorMessage = '';

describe('Notification model validations', () => {
  it('should create a new notification', (done) => {
    Model.Notification.create(validNotification)
      .then((newNotification) => {
        notification = newNotification;
        done();
      });
  });

  it('should create a new notification with userid, article slug, and message', () => {
    expect(validNotification.userId).to.equal(notification.userId);
    expect(validNotification.articleSlug).to.equal(notification.articleSlug);
    expect(validNotification.message).to.equal(notification.message);
  });

  describe('Validate Notification', () => {
    Model.Notification.create(invalidNotification)
      .catch((error) => {
        errorMessage = error.message;
      });
    it('should ensure that articleSlug and message is not null', () => {
      expect(errorMessage).to.equal('notNull Violation: Notification.message cannot be null,\nnotNull Violation: Notification.articleSlug cannot be null');
    });
  });
});
