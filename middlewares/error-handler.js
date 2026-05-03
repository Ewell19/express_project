const errorHandler = (err, req, res, next) => {
  if (next) {
    // no-op to satisfy eslint no-unused-vars while preserving Express signature
  }

  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? "An error has occurred on the server." : err.message;

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
