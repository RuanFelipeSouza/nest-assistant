import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    sparse: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});
