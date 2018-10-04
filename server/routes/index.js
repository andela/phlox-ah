import express from 'express';
import api from './api';

const router = express.Router();

// Add version to all api routes
router.use('/api/v1', api);

export default router;
