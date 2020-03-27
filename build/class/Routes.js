"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var express = _interopRequireWildcard(require("express"));

/* eslint-disable no-unused-vars */
var Routes = /*#__PURE__*/function () {
  function Routes(app) {
    (0, _classCallCheck2["default"])(this, Routes);
    this.app = app;
  }

  (0, _createClass2["default"])(Routes, [{
    key: "home",
    value: function home() {
      this.app.get('/', function (request, response) {
        response.send('Hello Good ol friend');
      });
    }
  }, {
    key: "getRoutes",
    value: function getRoutes() {
      this.home();
    }
  }]);
  return Routes;
}();

exports["default"] = Routes;
//# sourceMappingURL=Routes.js.map