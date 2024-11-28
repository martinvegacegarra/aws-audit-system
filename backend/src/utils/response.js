const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    status: 'success',
    data,
  });
};

const errorResponse = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({
    status: 'error',
    error: {
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    },
  });
};

module.exports = {
  successResponse,
  errorResponse,
};