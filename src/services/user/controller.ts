import User from './model';
import type { Request, Response } from 'express';

export const get = async (_: Request, res: Response): Promise<void> => {
  const users = await User.find();
  res.json(users);
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  console.log(id);
  res.json({ message: 'Getting user by id' });
};
