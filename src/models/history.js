import mongoose, { Schema } from "mongoose";

const historyModel = new Schema({
  userId: { type: String },
  prompt: { type: String },
  response: { type: String }
});

export default mongoose.model('History', historyModel);
