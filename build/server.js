'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _http = require("http");

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const start = async () => {
  // Setup server
  const app = (0, _express.default)();
  const server = (0, _http.createServer)(app); // Setup middlewares

  app.use((0, _cors.default)());
  app.use(_bodyParser.default.json()); // Setup endpoints

  await setupEndpoints(app); // Start service

  server.listen(_config.HTTP_PORT, () => console.log(`[HTTP] Listening on port ${_config.HTTP_PORT}`));
};

const setupEndpoints = async app => {
  const files = _fs.default.readdirSync(`${__dirname}/endpoints`);

  for (let i = 0; i < files.length; i++) {
    const {
      default: {
        method,
        path,
        handler
      }
    } = await Promise.resolve().then(() => _interopRequireWildcard(require(`./endpoints/${files[i]}`)));
    app[method](path, async (req, res) => {
      console.log(`[HTTP] Request received: ${method.toUpperCase()} ${path}`);

      try {
        res.send((await handler(req.body)));
      } catch (err) {
        res.status(400);
        res.send({
          error: true,
          message: err.message
        });
      }
    });
  }
};

const server = {
  start
};
var _default = server;
exports.default = _default;