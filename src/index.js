import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();

import welcomeRouter from './api/welcome.js';
import earlySignUpRouter from './api/early-sign-up.js';
import AiRouter from './api/openai.js';
import imageRouter from './api/image-routes.js';

const PORT = process.env.PORT || 8080;

// MongoDB configuration and connection
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

// Start the server
const app  = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://www.evaofficial.com']
}));
app.use(welcomeRouter);
app.use(earlySignUpRouter);
app.use(AiRouter);
app.use('/images', express.static('images'));

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
