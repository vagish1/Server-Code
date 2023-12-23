class FailureException extends Error {
    constructor(code, message, details = null) {
      super(); // Call the super constructor first
      this.status = "error";
      this.code = code;
      this.message = message;
      this.error = { code: code, details: details };
    }
  
    toJSON() {
      return {
        status: this.status,
        code: this.code,
        message: this.message,
        error: this.error,
      };
    }
  }
  
  class JwtTokenGenException extends FailureException {
    constructor(code, message, details = null) {
      super(code, message, details);
    }
  }
  
  class PasswordHasherException extends FailureException {
    constructor(code, message, details = null) {
      super(code, message, details);
    }
  }
  
  class UserAlreadyExistsException extends FailureException {
    constructor(message, details = null) {
      super(409, message, details);
    }
  }

  class UserNotFound extends FailureException {
    constructor(message, details = null) {
      super(400, message, details);
    }
  }
  class InvalidEmailException extends FailureException {
    constructor(message, details = null) {
      super(400, message, details);
    }
  }
  class InvalidTokenInHeader extends FailureException {
    constructor(message, details = null) {
      super(400, message, details);
    }
  }
  
  class InvalidPasswordException extends FailureException {}
  
  class SessionExpiredException extends FailureException {}
  
  class InvalidSessionsException extends FailureException {}
  
  module.exports = {
    FailureException,
    PasswordHasherException,
    JwtTokenGenException,
    UserAlreadyExistsException,
    InvalidPasswordException,
    SessionExpiredException,
    InvalidSessionsException,
    InvalidEmailException,
    UserNotFound,
    InvalidTokenInHeader
  };
  