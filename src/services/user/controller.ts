import User from './model';
import type { Request, Response } from 'express';

export const get = async (_: Request, res: Response): Promise<void> => {
  const users = await User.find();
  res.json(users);
};
