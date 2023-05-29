import { NextFunction, Response } from 'express';
import Request from '../types/express/index.js';

export function rolesGuard(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req?.roles) return res.sendStatus(401);

    // const rolesArray = [...allowedRoles];
    // const result = req.roles.map((role) => rolesArray.includes(role)).find((val) => val === true);
    const isRouteAllowed = req.roles.some((role: string) => allowedRoles.includes(role));
    // const isRouteAllowed = req.roles.some((role) => allowedRole === role);
    if (!isRouteAllowed) return res.sendStatus(401);
    next();
  };
}
