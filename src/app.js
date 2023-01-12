import express from 'express';
import welcomeRouter from './api/welcome.js';
import earlySignUpRouter from './api/early-sign-up-routes.js';

const app = express();
app.use(express.json());

app.use(welcomeRouter);
app.use(earlySignUpRouter);

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
