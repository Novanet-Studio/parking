import jwt from 'jsonwebtoken';
import Role from '../role/model';
import User from '../user/model';
import ServerResponse from '../../common/serverResponse';
import type { Request, Response } from 'express';
import type { RoleDocument } from '../role/model';

interface UserRequestBody {
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: string[];
}

export const signup = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { name, lastname, email, password, roles }: UserRequestBody = req.body;

  const newUser = new User({
    name,
    lastname,
    email,
    password,
  });

  newUser.password = await newUser.encryptPassword(password);

  if (!roles) {
    const role = await Role.findOne({ name: 'user' }) as RoleDocument;
    newUser.roles = [role._id];
  }

  const foundRoles = await Role.find({ name: { $in: roles } });
  newUser.roles = foundRoles.map((role) => role._id);

  const savedUser = await newUser.save();
  console.log(savedUser);

  const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });

  return res.json({ token });
};

export const signin = async (req: Request, res: Response): Promise<Response> => {
  const server = new ServerResponse(res);
  const userFound = await User.findOne({ email: req.body.email }).populate('roles');

  if (!userFound) return server.notFound(`User with email "${req.body.email}" not found`);

  console.log(userFound);

  const matchPassword = await userFound.comparePassword(req.body.password, userFound.password); 

  if (!matchPassword) return server.unauthorized(`Invalid password`);
  
  const token = jwt.sign({ id: userFound._id}, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });

  return res.json({ token });
};
