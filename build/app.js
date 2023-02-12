"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;
var _express = _interopRequireDefault(require("express"));
var _welcome = _interopRequireDefault(require("./api/welcome.js"));
var _earlySignUpRoutes = _interopRequireDefault(require("./api/early-sign-up-routes.js"));
var _openai = _interopRequireDefault(require("./api/openai.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_welcome.default);
app.use(_earlySignUpRoutes.default);
app.use(_openai.default);
let server;
const App = {
  app,
  start: port => {
    server = app.listen(port, () => console.log(`Listening on ${port}...`));
  },
  stop: () => {
    server.close(() => {
      console.log('Server has been stopped');
    });
  }
};
exports.App = App;