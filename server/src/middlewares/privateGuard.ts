import { NextFunction, Response } from 'express';
import Request from '../types/express/index.js';

export async function privateGuard(req: Request, res: Response, next: NextFunction) {
  if (+req.params.id == req?.userId) return next();

  res.sendStatus(403);
}
