import mongoose, { Schema } from 'mongoose';

const waitingListUser = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

export default mongoose.model('Waiting List User', waitingListUser);