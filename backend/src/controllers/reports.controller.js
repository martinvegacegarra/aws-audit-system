const asyncHandler = require('express-async-handler');
const reportsService = require('../services/reports.service');
const logger = require('../utils/logger');
const { successResponse } = require('../utils/response');
const { ValidationError } = require('../utils/errors');

const generateReport = asyncHandler(async (req, res) => {
  const { services, format = 'json', region } = req.query;

  if (!services) {
    throw new ValidationError('Please specify services to include in the report');
  }

  const servicesList = services.split(',');
  
  try {
    const report = await reportsService.generateReport(servicesList, format, region);
    
    if (format.toLowerCase() === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=aws-report.csv');
      return res.send(report);
    }
    
    return successResponse(res, report);
  } catch (error) {
    logger.error('Error generating report:', error);
    throw error;
  }
});

module.exports = {
  generateReport,
};