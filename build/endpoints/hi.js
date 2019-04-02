'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _response = require("./../utils/response.util");

const ok = (0, _response.withStatusCode)(200, JSON.stringify);
const endpoint = {
  method: 'post',
  path: '/hi',
  handler: body => {
    const {
      name
    } = body;
    return ok({
      'message': `hi ${name === undefined ? 'karen' : name}`
    });
  }
};
var _default = endpoint;
exports.default = _default;