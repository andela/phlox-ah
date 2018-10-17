import express from 'express';
import ReportController from '../../controllers/reportController';
import Authenticator from '../../middlewares/authenticator';
import { isValidReportData } from '../../middlewares/reportValidations';

const { checkToken } = Authenticator;

const router = express.Router();

router.post('/articles/:articleSlug/reports', checkToken, isValidReportData, ReportController.createReport);
router.get('/articles/:articleSlug/reports', checkToken, ReportController.getArticleReport);
router.put('/articles/:articleSlug/reports/:reportId/edit', checkToken, ReportController.editReport);
router.put('/articles/:articleSlug/reports/:reportId/resolve', checkToken, ReportController.resolveReport);
router.get('/articles/:articleSlug/reports/resolved', checkToken, ReportController.getResolvedArticleReport);
router.get('/articles/:articleSlug/reports/unresolved', checkToken, ReportController.getUnresolvedArticleReport);
router.get('/reports/resolved', checkToken, ReportController.getResolvedReport);
router.get('/reports/unresolved', checkToken, ReportController.getUnresolvedReport);
router.get('/reports', checkToken, ReportController.getAllReport);


export default router;
