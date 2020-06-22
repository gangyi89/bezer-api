class DomainException extends Error {
  constructor(message, statusCode = 400) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = DomainException;
