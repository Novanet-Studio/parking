import { model, Schema } from 'mongoose';
import type { Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  apartment: number;
  seatsAllowed: number;
  reservedSeats: number;
  visitorBoothAssignment: number;
  encryptPassword(password: string): string;
  comparePassword(password: string): boolean;
}

const userSchema: Schema<UserDocument> = new Schema({
  fullname: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  apartment: Number,
  seatsAllowed: Number,
  reserverdSeats: Number,
  visitorBoothAssignment: Number,
});

const User: Model<UserDocument> = model('User', userSchema);

export default User;
