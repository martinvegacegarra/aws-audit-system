const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const config = require('../config/config');
const logger = require('../utils/logger');
const { successResponse, errorResponse } = require('../utils/response');
const { AuthenticationError } = require('../utils/errors');

const login = asyncHandler(async (req, res) => {
  const { accessKeyId, secretAccessKey } = req.body;

  try {
    // Here you would typically validate the AWS credentials
    // For now, we'll just create a token
    const token = jwt.sign(
      { accessKeyId },
      config.jwtSecret,
      { expiresIn: '1d' }
    );

    return successResponse(res, {
      token,
      expiresIn: 86400, // 24 hours in seconds
    });
  } catch (error) {
    logger.error('Login error:', error);
    throw new AuthenticationError('Invalid credentials');
  }
});

const validateToken = asyncHandler(async (req, res) => {
  return successResponse(res, { valid: true });
});

module.exports = {
  login,
  validateToken,
};