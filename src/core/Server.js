import express from 'express';
import { createServer } from 'http';
import initSockets from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import Socket from './Socket';
import Routes from './Routes';

class Server {
  constructor() {
    this.port = process.env.PORT || process.env.DEV_PORT;
    this.app = express();
    this.server = createServer(this.app);
    this.io = initSockets(this.server);

    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
  }

  listenServer() {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
      const routes = new Routes(this.app);
      routes.getRoutes();
    });
  }

  listenSocket() {
    this.io.on('connection', socket => {
      const sockt = new Socket(socket, this.io);
      sockt.getSocket();
    });
  }

  start() {
    this.listenServer();
    this.listenSocket();
  }
}

export default Server;
