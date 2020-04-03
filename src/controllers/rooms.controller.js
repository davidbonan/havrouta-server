import rooms from '../core/data/rooms';

const roomController = {
  onCreateRoom(whiteboardLink, roomId) {
    let room = rooms.getRoomById(roomId);
    if (!room) {
      room = rooms.createRoom(roomId);
      room.addWhiteboardLink(whiteboardLink);
    }
    return room.getId();
  },

  isValidRoom(roomId, userId) {
    const room = rooms.getRoomById(roomId);
    if (room) {
      if (room.hasUser(userId) || room.isNotFull()) {
        return true;
      }
      return 'error';
    }
    return false;
  },

  onUserJoinRoom(roomId, userId) {
    const room = rooms.getRoomById(roomId);
    room.addUser(userId);
  },

  getWhiteboardLink(roomId) {
    const room = rooms.getRoomById(roomId);
    return room.getWhiteboardLink();
  },

  getCurrentPage(roomId) {
    const room = rooms.getRoomById(roomId);
    return room.getCurrentPage();
  },

  setCurrentPage(roomId, collection, book, page) {
    const room = rooms.getRoomById(roomId);
    room.setCurrentPage(collection, book, page);
  },

  onDisconnect(roomId, userId) {
    const room = rooms.getRoomById(roomId);
    if (room) {
      room.removeUser(userId);
    }
  }
};

export default roomController;
