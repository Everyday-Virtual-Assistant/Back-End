"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const welcomeRouter = _express.default.Router();
welcomeRouter.get('/', (req, res) => {
  res.send('Welcome to the Everyday Virtual Assistant, or EVA for short');
});
var _default = welcomeRouter;
exports.default = _default;