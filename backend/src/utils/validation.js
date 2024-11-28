const Joi = require('joi');

const loginSchema = Joi.object({
  accessKeyId: Joi.string().required(),
  secretAccessKey: Joi.string().required(),
});

const reportSchema = Joi.object({
  services: Joi.string().required(),
  format: Joi.string().valid('json', 'csv', 'excel').default('json'),
  region: Joi.string(),
});

const validateLogin = (data) => {
  return loginSchema.validate(data);
};

const validateReportQuery = (data) => {
  return reportSchema.validate(data);
};

module.exports = {
  validateLogin,
  validateReportQuery,
};