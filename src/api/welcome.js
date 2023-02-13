import express from 'express';
const welcomeRouter = express.Router();

welcomeRouter.get('/', (req, res) => {
  res.send('Welcome to the Everyday Virtual Assistant, or EVA for short')
})

export default welcomeRouter;