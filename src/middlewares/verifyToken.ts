import jwt from 'jsonwebtoken';
import User from '../services/user/model';
import ServerResponse from '../common/serverResponse';
import type { NextFunction, Request, Response } from 'express';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const server = new ServerResponse(res);
  try {
    const token = req.headers['x-access-token'] as string;

    if (!token) return server.forbidden('No token provided');

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return server.notFound(`User not found`);

    next();
  } catch (error) {
    return server.unauthorized();
  }
}
