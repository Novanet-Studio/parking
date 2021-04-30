import { NextFunction, Request, Response } from 'express';
import ServerResponse from '../common/serverResponse';
import Role from '../services/role/model';
import User from '../services/user/model';

export const isModerator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response> => {
  const server = new ServerResponse(res);
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user?.roles }});

  roles.forEach(role => {
    if (role.name === 'moderator') {
      next();
      return;
    }
  });

  return server.forbidden('Require "moderator" role');
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response> => {
  const server = new ServerResponse(res);
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user?.roles }});

  roles.forEach(role => {
    if (role.name === 'admin') {
      next();
      return;
    }
  });

  return server.forbidden('Require "admin" role');
};
