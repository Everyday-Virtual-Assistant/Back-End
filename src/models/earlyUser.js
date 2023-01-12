import mongoose, { Schema } from 'mongoose';

const earlyUserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
})