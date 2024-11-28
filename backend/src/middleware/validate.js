const { validateLogin, validateReportQuery } = require('../utils/validation');

const validateLoginRequest = (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

const validateReportRequest = (req, res, next) => {
  const { error } = validateReportQuery(req.query);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

module.exports = {
  validateLoginRequest,
  validateReportRequest,
};