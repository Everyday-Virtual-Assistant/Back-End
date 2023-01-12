import express from 'express';
const earlySignUpRouter = express.Router();

// list of all early users
earlySignUpRouter.get('/all-early-users', (req, res) => {
  
})

// check if provided email is already registered


// if registered, send response saying so

// if not registered, then add email to the list

export default earlySignUpRouter;