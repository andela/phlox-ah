import express from 'express';
import NotificationController from '../../controllers/notificationController';
import Authenticator from '../../middlewares/authenticator';

const { checkToken } = Authenticator;
const router = express.Router();

router.get('/notifications', checkToken, NotificationController.getNotifications);
router.get('/notifications/unseen', checkToken, NotificationController.getUnseenNotifications);
router.put('/notifications/seen/:notificationId', checkToken, NotificationController.markAsSeen);
router.put('/notifications/unseen/:notificationId', checkToken, NotificationController.markAsUnseen);
router.put('/notifications/optout', checkToken, NotificationController.optOut);
router.put('/notifications/optin/', checkToken, NotificationController.optIn);

export default router;
