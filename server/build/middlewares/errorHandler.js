import ApiError from '../exceptions/ApiError.js';
function errorHandler(err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Unexpected error' });
}
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map