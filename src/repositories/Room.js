class Room {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.whiteboardLink = '';
    this.collection = undefined;
    this.book = undefined;
    this.page = undefined;
  }

  getId() {
    return this.id;
  }

  addUser(userId) {
    if (this.users.indexOf(userId) === -1) {
      this.users.push(userId);
    }
  }

  removeUser(userId) {
    const userIndex = this.users.indexOf(userId);
    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
    }
  }

  hasUser(userId) {
    return this.users.indexOf(userId) > -1;
  }

  isNotFull() {
    return this.users.length < 2;
  }

  addWhiteboardLink(whiteboardLink) {
    this.whiteboardLink = whiteboardLink;
  }

  getWhiteboardLink() {
    return this.whiteboardLink;
  }

  setCurrentPage(collection, book, page) {
    this.collection = collection;
    this.book = book;
    this.page = page;
  }

  getCurrentPage() {
    return { collection: this.collection, book: this.book, page: this.page };
  }
}

export default Room;
