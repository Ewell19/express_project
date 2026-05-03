class BadRequestError extends Error {
  constructor(message = "Invalid request data") {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
