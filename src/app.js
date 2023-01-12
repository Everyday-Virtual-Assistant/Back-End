import express from 'express';
import welcomeRouter from './api/welcome.js';

const app = express();

app.use(welcomeRouter);

let server;

export const App = {
  app,
  start: (port) => {
    server = app.listen(port, () => console.log(`Listening on ${port}...`));
  },
  stop: () => {
    server.close( () => {
      console.log('Server has been stopped');
    });
  },
};
