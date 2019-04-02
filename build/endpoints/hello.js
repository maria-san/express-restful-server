'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _response = require("./../utils/response.util");

const ok = (0, _response.withStatusCode)(80, JSON.stringify);
const endpoint = {
  method: 'get',
  path: '/hello',
  handler: () => {
    return ok({
      'message': 'hello world'
    });
  }
};
var _default = endpoint;
exports.default = _default;