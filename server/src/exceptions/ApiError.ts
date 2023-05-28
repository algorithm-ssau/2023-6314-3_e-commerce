class ApiError extends Error {
  status;
  // errors;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    // this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User is not authorized');
  }

  static BadRequest(message: string) {
    return new ApiError(400, message);
    // return new ApiError(400, message, errors)
  }

  static NotFound(message?: string) {
    if (message) return new ApiError(400, message);

    return new ApiError(400, `Not Found`);
  }

  static InternalError(message?: string) {
    if (message) return new ApiError(500, `Internal Server Error: ${message}`);

    return new ApiError(500, 'Internal Server Error');
  }
}

export default ApiError;
