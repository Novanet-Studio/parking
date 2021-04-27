import User from '../services/user/model';
import ServerResponse from '../common/serverResponse';
import type { Request, Response, NextFunction } from 'express';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const server = new ServerResponse(res);
  const email = await User.findOne({ email: req.body.email });

  if (email) return server.badRequest(`The email already exists`);

  next();
}
