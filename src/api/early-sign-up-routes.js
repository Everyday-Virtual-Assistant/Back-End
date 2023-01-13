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
    console.error(err);
  }
});

// get a single early user
earlySignUpRouter.get('/single-early-user', async (req, res) => {
  try {
    const user = await waitingListUser.find({ _id: req.body.userId });
    sendJSON(res, user);
  } catch (err) {
    console.log(err);
    sendJSON(res, err);
  }
});

earlySignUpRouter.post('/add-new-early-user', async (req, res) => {
  try {
    const { name, email } = req.body;
    let newWaitingListUser = await waitingListUser.create({ name, email });
    sendJSON(res, newWaitingListUser);
  } catch (err) {
    console.log(err);
  }
})

// check if provided email is already registered


// if registered, send response saying so

// if not registered, then add email to the list

export default earlySignUpRouter;