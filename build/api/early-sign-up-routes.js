"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _newWaitingListUser = _interopRequireDefault(require("../models/newWaitingListUser.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const earlySignUpRouter = _express.default.Router();

// list of all early users
earlySignUpRouter.get('/all-early-users', async (req, res) => {
  try {
    let allUsers = await _newWaitingListUser.default.find({});
    res.send(allUsers);
  } catch (err) {
    console.error(`An error occured while trying to retrieve all Users: ${err}`);
    res.status(500).json(err);
  }
});

// get a single early user
earlySignUpRouter.get('/single-early-user', async (req, res) => {
  try {
    const user = await _newWaitingListUser.default.find({
      _id: req.body.userId
    });
    res.send(user);
  } catch (err) {
    console.error(`An error occured while trying to retrieve the User: ${err}`);
    res.status(500).json(err);
  }
});
earlySignUpRouter.post('/add-new-early-user', async (req, res) => {
  try {
    const {
      name,
      email
    } = req.body;
    let newWaitingListUser = await _newWaitingListUser.default.create({
      name,
      email
    });
    res.send(newWaitingListUser);
  } catch (err) {
    console.error(`An error occured while trying to create the new User: ${err}`);
    res.status(500).json(err);
  }
});

// check if provided email is already registered

// if registered, send response saying so

// if not registered, then add email to the list
var _default = earlySignUpRouter;
exports.default = _default;