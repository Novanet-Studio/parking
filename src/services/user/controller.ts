import User from './model';
import ServerResponse from '../../common/serverResponse';
import type { Request, Response } from 'express';

export const get = async (_: Request, res: Response): Promise<void> => {
  const users = await User.find();
  res.json(users);
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findOne({ _id: req.params.id });
  res.json(user);
};

export const add = async (req: Request, res: Response): Promise<Response> => {
  const server = new ServerResponse(res);
  const exists = await User.findOne({ email: req.body.email });

  if (exists) {
    return server.badRequest(`User ${req.body.email} already exists`);
  }

  try {
    const user = new User({ ...req.body });

    await user.save();

    return res.status(201).json('New user added');
  } catch (error) {
    return server.internalServerError(`Was an error creating user: ${error.message}`);
  }
};

export const update = async (req: Request, res: Response): Promise<Response> => {
  const server = new ServerResponse(res);
  try {
    const userUpdated = await User.findOneAndUpdate({ _id: req.params.id }, { ...req.body });

    if (!userUpdated) {
      return server.notFound(`User with id: ${req.params.id} doesn't exists`);
    }
    
    return res.json('Update');
  } catch (error) {
    return server.internalServerError(`Was an error updating user: ${error.message}`);
  }
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  const server = new ServerResponse(res);
  const id = req.params.id;

  try {
    const userDeleted = await User.findOneAndDelete({ _id: id });

    if (!userDeleted) {
      return server.notFound(`User with id "${req.params.id}" not found`);
    }

    return res.json(userDeleted);
  } catch (error) {
    return server.internalServerError(`Was an error while removing user: ${error.message}`);
  }
};

