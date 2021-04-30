import { model, Schema } from 'mongoose';
import type { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserDocument extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: string[];
  // apartmentNumber: number;
  // seatsAllowed: number;
  // reservedSeats: number;
  // visitorBoothAssignment: number;
  encryptPassword(password: string): string;
  comparePassword(password: string): boolean;
}

const userSchema: Schema<UserDocument> = new Schema({
  name: String,
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // apartmentNumber: Number,
  // seatsAllowed: Number,
  // reservedSeats: Number,
  // visitorBoothAssignment: Number,
  roles: [{
    ref: 'Role',
    type: Schema.Types.ObjectId,
  }]
}, {
  timestamps: true,
  versionKey: false,
});

userSchema.methods.encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async (password: string, receivedPassword: string) => {
  return bcrypt.compare(password, receivedPassword);
};

const User: Model<UserDocument> = model('User', userSchema);

export default User;
