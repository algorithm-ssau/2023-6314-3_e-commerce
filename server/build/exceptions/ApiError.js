class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
    static UnauthorizedError() {
        return new ApiError(401, 'User is not authorized');
    }
    static BadRequest(message) {
        return new ApiError(400, message);
    }
    static NotFound(message) {
        if (message)
            return new ApiError(404, message);
        return new ApiError(404, `Not Found`);
    }
    static Forbidden(message) {
        if (message)
            return new ApiError(403, message);
        return new ApiError(403, `Forbidden`);
    }
    static InternalError(message) {
        if (message)
            return new ApiError(500, `Internal Server Error: ${message}`);
        return new ApiError(500, 'Internal Server Error');
    }
}
export default ApiError;
//# sourceMappingURL=ApiError.js.map