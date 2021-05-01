import { model, Schema } from 'mongoose';
import type { Document, Model } from 'mongoose';

export interface RoleDocument extends Document {
  _id: string;
  name: string;
}

export const ROLES = ['admin', 'moderator', 'user'];

const roleSchema: Schema<RoleDocument> = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  },
);

const Role: Model<RoleDocument> = model('Role', roleSchema);

export default Role;
