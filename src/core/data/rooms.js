import uniqid from 'uniqid';
import Room from '../../repositories/Room';

class Rooms {
  constructor() {
    this.rooms = {};
  }

  createRoom(roomId) {
    const randomId = roomId || uniqid.time();
    this.rooms[randomId] = new Room(randomId);
    return this.rooms[randomId];
  }

  getRooms() {
    return this.rooms;
  }

  getRoomById(roomId) {
    return this.rooms[roomId];
  }

  reset() {
    this.rooms = {};
  }
}

const rooms = new Rooms();
export default rooms;
