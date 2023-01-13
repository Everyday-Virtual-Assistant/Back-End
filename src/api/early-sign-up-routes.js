import express from 'express';
import waitingListUser from '../models/newWaitingListUser.js';
import sendJSON from '../middleware/sendJSON.js';
const earlySignUpRouter = express.Router();

// list of all early users
earlySignUpRouter.get('/all-early-users', async (req, res) => {
  try {
    let allUsers = await waitingListUser.find({});
    res.send(allUsers);
  } catch (err) {
    console.error(`An error occured while trying to retrieve all Users: ${err}`);
    res.status(500).json(err);
  }
});

// get a single early user
earlySignUpRouter.get('/single-early-user', async (req, res) => {
  try {
    const user = await waitingListUser.find({ _id: req.body.userId });
    res.send(user);
  } catch (err) {
    console.error(`An error occured while trying to retrieve the User: ${err}`);
    res.status(500).json(err);
    sendJSON(res, err);
  }
});

earlySignUpRouter.post('/add-new-early-user', async (req, res) => {
  try {
    const { name, email } = req.body;
    let newWaitingListUser = await waitingListUser.create({ name, email });
    res.send(newWaitingListUser);
  } catch (err) {
    console.error(`An error occured while trying to create the new User: ${err}`);
    res.status(500).json(err);
  }
})

// check if provided email is already registered


// if registered, send response saying so

// if not registered, then add email to the list

export default earlySignUpRouter;