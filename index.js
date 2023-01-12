import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { App } from './src/app.js';
dotenv.config();

const options = { useNewUrlParser: true }

try {
  mongoose.connect(process.env.MONGODB_URI, options);
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.on('open', () => {
    console.log(`Connected to MongoDB Cluster`);
  });
} catch (e) {
  console.error(e);
}

try {
  App.start(process.env.PORT);
} catch (e) {
  console.error(e);
}