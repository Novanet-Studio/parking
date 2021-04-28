import User from './model';
import ServerResponse from '../../common/serverResponse';
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

export const add = async (req: Request, res: Response): Promise<Response> => {
  const server = new ServerResponse(res);
  const exists = await User.findOne({ email: req.body.email });

  if (exists) {
    server.notFound(`User ${req.body.email} already exists`);
  }

  try {
    const user = new User({ ...req.body });

    await user.save();

    return res.status(201).json('New user added');
  } catch (error) {
    return server.internalServerError(`Was an error creating user: ${error.message}`);
  }
};
