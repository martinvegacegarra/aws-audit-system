const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reports.controller');
const { authenticate } = require('../middleware/auth');
const { validateReportRequest } = require('../middleware/validate');

router.get('/generate', authenticate, validateReportRequest, reportsController.generateReport);

module.exports = router;