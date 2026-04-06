const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err.stack);

  res.status(error.code || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};

module.exports = errorHandler;

