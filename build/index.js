"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _app = require("./app.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const options = {
  useNewUrlParser: true
};
try {
  _mongoose.default.connect(process.env.MONGODB_URI, options);
  let db = _mongoose.default.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.on('open', () => {
    console.log(`Connected to MongoDB Cluster`);
  });
} catch (e) {
  console.error(e);
}
try {
  _app.App.start(process.env.PORT);
} catch (e) {
  console.error(e);
}