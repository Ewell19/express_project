class ConflictError extends Error {
  constructor(message = "Resource conflict") {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
