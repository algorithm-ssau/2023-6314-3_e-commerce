import { NextFunction, Response } from 'express';
import Request from '../types/express/index.js';

import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/index.js';

export async function authGuard(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization ?? req.headers.Authorization;

  if (!(typeof authHeader === 'string') || !authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ?? 'secret') as TokenPayload;
    // req.userInfo = { ...req.userInfo, userId: payload.id, roles: payload.roles };
    req.userId = payload.id;
    req.roles = payload.roles as typeof req.roles;
    next();
  } catch (err) {
    return res.sendStatus(403); //invalid token
  }
}
