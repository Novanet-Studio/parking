import jwt from 'jsonwebtoken';
import Role from '../role/model';
import User from '../user/model';
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

  const token = jwt.sign({ id: savedUser._id }, process.env.JWT_TOKEN, {
    expiresIn: 86400, // 24 hours
  });

  return res.json({ token });
};
