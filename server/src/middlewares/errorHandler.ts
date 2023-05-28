import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/ApiError.js';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Unexpected error' });
}

export default errorHandler;
