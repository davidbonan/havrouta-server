"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _ChatServer = _interopRequireDefault(require("./class/ChatServer"));

var _Routes = _interopRequireDefault(require("./class/Routes"));

/* eslint-disable import/prefer-default-export */
var app = new _ChatServer["default"]().getApp();
exports.app = app;
var route = new _Routes["default"](app);
route.getRoutes();
//# sourceMappingURL=server.js.map