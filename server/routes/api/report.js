import express from 'express';
import ReportController from '../../controllers/reportController';
import Authenticator from '../../middlewares/authenticator';
import isValidReportData from '../../middlewares/reportValidations';

const { checkToken } = Authenticator;

const router = express.Router();

router.post('/articles/:articleSlug/reports', checkToken, isValidReportData, ReportController.createReport);
router.get('/articles/:articleSlug/reports', checkToken, ReportController.getArticleReport);
router.put('/articles/:articleSlug/reports/:reportId/edit', checkToken, ReportController.editReport);
router.put('/articles/:articleSlug/reports/:reportId/approve', checkToken, ReportController.approveReport);
router.get('/articles/:articleSlug/reports/approve', checkToken, ReportController.getApproveArticleReport);
router.get('/articles/:articleSlug/reports/disapprove', checkToken, ReportController.getDisapproveArticleReport);
router.get('/reports/approve', checkToken, ReportController.getAllApproveReport);
router.get('/reports/disapprove', checkToken, ReportController.getAllDisapproveReport);
router.get('/reports', checkToken, ReportController.getAllReport);


export default router;
