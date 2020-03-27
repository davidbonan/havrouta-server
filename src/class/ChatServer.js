/* eslint-disable no-unused-expressions */
import express from 'express';
import { createServer } from 'http';
import socketIo from 'socket.io';
import uniqid from 'uniqid';

export default class ChatServer {
  constructor() {
    this.PORT = 5000;
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

  createApp() {
    this.app = express();
  }

  config() {
    this.port = process.env.PORT || this.PORT;
  }

  createServer() {
    this.server = createServer(this.app);
  }

  sockets() {
    this.io = socketIo(this.server);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    this.io.on('connection', socket => {
      socket.on('create-room', callback => {
        const roomId = uniqid.time();
        this.rooms[roomId] = [];
        callback(roomId);
      });

      socket.on('is-room-exist', ({ roomId }, callback) => {
        if (callback) {
          callback(Array.isArray(this.rooms[roomId]));
        }
      });

      socket.on('join-room', ({ roomId }, callback) => {
        if (this.rooms[roomId]) {
          this.rooms[roomId].push(socket.id);
        } else {
          this.rooms[roomId] = [];
        }
        socket.join(roomId);
        socket.in(roomId).emit('new-user-join', { peerId: socket.id });
        if (callback) {
          callback(roomId);
        }
      });

      socket.on('send-message', ({ roomId, message }) => {
        this.io.in(roomId).emit('dispatch-message', {
          message,
          from: socket.id
        });
      });

      socket.on('send-draw-line', ({ roomId, mousePosition, newMousePosition }) => {
        socket.in(roomId).emit('dispatch-draw-line', {
          mousePosition,
          newMousePosition
        });
      });

      socket.on('signal', ({ to, signal }) => {
        const data = {
          from: socket.id,
          signal
        };
        socket.to(to).emit('signal', data);
      });

      socket.on('disconnect', ({ roomId }) => {
        const indexOfMe = this.rooms[roomId] && this.rooms[roomId].indexOf(socket.id);
        if (indexOfMe > -1) {
          this.rooms[roomId].splice(indexOfMe, 1);
        }
      });
    });
  }

  getApp() {
    return this.app;
  }
}
