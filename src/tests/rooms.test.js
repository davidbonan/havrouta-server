import rooms from '../core/data/rooms';
import roomController from '../controllers/rooms.controller';

describe('Rooms use cases', () => {
  afterEach(() => {
    rooms.reset();
  });

  it('create room', () => {
    const roomId = roomController.onCreateRoom('https://excalidraw.com');
    expect(rooms.getRoomById(roomId)).toHaveProperty('id', roomId);
  });

  it('create room with custom id', () => {
    const roomId = roomController.onCreateRoom('https://excalidraw.com', 'customID');
    expect(rooms.getRoomById(roomId)).toHaveProperty('id', 'customID');
  });

  it('room exist and nb user < 2', () => {
    const roomId = roomController.onCreateRoom();
    roomController.onUserJoinRoom(roomId, 'user1');

    const isValid = roomController.isValidRoom(roomId, 'user2');
    expect(isValid).toBeTruthy();
  });

  it("room doesn't exist", () => {
    const isValid = roomController.isValidRoom('noId');
    expect(isValid).toBeFalsy();
  });

  it('room exist and nb user = 2 and is new user', () => {
    const roomId = roomController.onCreateRoom();
    roomController.onUserJoinRoom(roomId, 'user1');
    roomController.onUserJoinRoom(roomId, 'user2');

    const isValid = roomController.isValidRoom(roomId, 'user3');
    expect(isValid).toBeFalsy();
  });

  it('room exist and nb user = 2 and is not new user', () => {
    const roomId = roomController.onCreateRoom();
    roomController.onUserJoinRoom(roomId, 'user1');
    roomController.onUserJoinRoom(roomId, 'user2');

    const isValid = roomController.isValidRoom(roomId, 'user2');
    expect(isValid).toBeTruthy();
  });

  it('user join room', () => {
    const roomId = roomController.onCreateRoom();
    roomController.onUserJoinRoom(roomId, 'user1');

    expect(rooms.getRoomById(roomId)).toHaveProperty('users', ['user1']);
  });

  it('user leave room', () => {
    const roomId = roomController.onCreateRoom();
    roomController.onUserJoinRoom(roomId, 'user1');
    roomController.onDisconnect(roomId, 'user1');

    expect(rooms.getRoomById(roomId)).toHaveProperty('users', []);
  });
});
