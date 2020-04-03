import roomController from '../controllers/rooms.controller';

class Socket {
  constructor(socket, io) {
    this.socket = socket;
    this.io = io;
    this.id = this.socket.id;
  }

  on(event, fn) {
    this.socket.on(event, (...args) => {
      let callback;
      const params = [];
      for (let i = 0; i < args.length; i += 1) {
        const param = args[i];
        if (typeof param === 'function') {
          callback = param;
        } else {
          params.push(param);
        }
      }

      try {
        const result = fn(...params);
        if (callback) {
          callback(result);
        }
      } catch (error) {
        console.log(`Error ${error}`);
      }
    });
  }

  join(roomId) {
    this.socket.join(roomId);
  }

  handleCreateRoom() {
    this.on('create-room', ({ whiteboardLink, roomId }) => {
      return roomController.onCreateRoom(whiteboardLink, roomId);
    });
  }

  handleIsValidRoom() {
    this.on('is-valid-room', ({ roomId }) => {
      return roomController.isValidRoom(roomId, this.id);
    });
  }

  handleGetWhiteboardLink() {
    this.on('get-whiteboard-link', ({ roomId }) => {
      return roomController.getWhiteboardLink(roomId);
    });
  }

  handleUserJoinRoom() {
    this.on('join-room', ({ roomId }) => {
      roomController.onUserJoinRoom(roomId, this.id);
      this.join(roomId);
    });
  }

  handleUserPeering() {
    this.on('user-peering', ({ roomId }) => {
      this.socket.in(roomId).emit('new-user-peering', { peerId: this.id });
      return true;
    });
  }

  handleSendMessage() {
    this.on('send-message', ({ roomId, message }) => {
      this.io.in(roomId).emit('dispatch-message', {
        message,
        from: this.id
      });
    });
  }

  handleReceptSignalPeer() {
    this.on('signal', ({ to, signal }) => {
      const data = {
        from: this.id,
        signal
      };
      this.socket.to(to).emit('signal', data);
    });
  }

  handleGetCurrentBookPage() {
    this.on('get-current-page', ({ roomId }) => {
      return roomController.getCurrentPage(roomId);
    });
  }

  handleOnChangeBook() {
    this.on('send-page', ({ roomId, collection, book, page }) => {
      roomController.setCurrentPage(roomId, collection, book, page);
      this.socket.in(roomId).emit('dispatch-change-page', {
        collection,
        book,
        page
      });
    });
  }

  handleLeaveRoom() {
    this.on('leave-room', ({ roomId }) => {
      roomController.onDisconnect(roomId, this.id);
    });
  }

  handleDisconnect() {
    this.on('disconnect', ({ roomId }) => {
      roomController.onDisconnect(roomId, this.id);
    });
  }

  getSocket() {
    this.handleCreateRoom();
    this.handleUserJoinRoom();
    this.handleUserPeering();
    this.handleIsValidRoom();
    this.handleGetWhiteboardLink();
    this.handleSendMessage();
    this.handleReceptSignalPeer();
    this.handleGetCurrentBookPage();
    this.handleOnChangeBook();
    this.handleLeaveRoom();
    this.handleDisconnect();
  }
}

export default Socket;
