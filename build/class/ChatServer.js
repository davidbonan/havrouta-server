"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _socket = _interopRequireDefault(require("socket.io"));

var _uniqid = _interopRequireDefault(require("uniqid"));

/* eslint-disable no-unused-expressions */
var ChatServer = /*#__PURE__*/function () {
  function ChatServer() {
    (0, _classCallCheck2["default"])(this, ChatServer);
    this.DEV_PORT = 5000;
    this.app;
    this.port;
    this.server;
    this.io;
    this.rooms = {};
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  (0, _createClass2["default"])(ChatServer, [{
    key: "createApp",
    value: function createApp() {
      this.app = (0, _express["default"])();
    }
  }, {
    key: "config",
    value: function config() {
      this.port = process.env.PORT || this.DEV_PORT;
    }
  }, {
    key: "createServer",
    value: function createServer() {
      this.server = (0, _http.createServer)(this.app);
    }
  }, {
    key: "sockets",
    value: function sockets() {
      this.io = (0, _socket["default"])(this.server);
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this = this;

      this.server.listen(this.port, function () {
        console.log('Running server on port %s', _this.port);
      });
      this.io.on('connection', function (socket) {
        socket.on('create-room', function (callback) {
          var roomId = _uniqid["default"].time();

          _this.rooms[roomId] = [];
          callback(roomId);
        });
        socket.on('is-room-exist', function (_ref, callback) {
          var roomId = _ref.roomId;

          if (callback) {
            callback(Array.isArray(_this.rooms[roomId]));
          }
        });
        socket.on('join-room', function (_ref2, callback) {
          var roomId = _ref2.roomId;

          if (_this.rooms[roomId]) {
            _this.rooms[roomId].push(socket.id);
          } else {
            _this.rooms[roomId] = [];
          }

          socket.join(roomId);
          socket["in"](roomId).emit('new-user-join', {
            peerId: socket.id
          });

          if (callback) {
            callback(roomId);
          }
        });
        socket.on('send-message', function (_ref3) {
          var roomId = _ref3.roomId,
              message = _ref3.message;

          _this.io["in"](roomId).emit('dispatch-message', {
            message: message,
            from: socket.id
          });
        });
        socket.on('send-draw-line', function (_ref4) {
          var roomId = _ref4.roomId,
              mousePosition = _ref4.mousePosition,
              newMousePosition = _ref4.newMousePosition;
          socket["in"](roomId).emit('dispatch-draw-line', {
            mousePosition: mousePosition,
            newMousePosition: newMousePosition
          });
        });
        socket.on('signal', function (_ref5) {
          var to = _ref5.to,
              signal = _ref5.signal;
          var data = {
            from: socket.id,
            signal: signal
          };
          socket.to(to).emit('signal', data);
        });
        socket.on('disconnect', function (_ref6) {
          var roomId = _ref6.roomId;

          var indexOfMe = _this.rooms[roomId] && _this.rooms[roomId].indexOf(socket.id);

          if (indexOfMe > -1) {
            _this.rooms[roomId].splice(indexOfMe, 1);
          }
        });
      });
    }
  }, {
    key: "getApp",
    value: function getApp() {
      return this.app;
    }
  }]);
  return ChatServer;
}();

exports["default"] = ChatServer;
//# sourceMappingURL=ChatServer.js.map