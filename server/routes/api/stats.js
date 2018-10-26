import express from 'express';
import Authenticator from '../../middlewares/authenticator';
import StatsController from '../../controllers/statController';

const { checkToken } = Authenticator;

const router = express.Router();

router.get('/stats', checkToken, StatsController.getStats);

export default router;
