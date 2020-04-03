/* eslint-disable no-unused-vars */
import * as express from 'express';
import books from './data/books';

class Routes {
  constructor(app) {
    this.app = app;
  }

  home() {
    this.app.get('/', (request, response) => {
      response.send('Hello Good ol friend');
    });
  }

  listBook() {
    this.app.get('/books', (request, response) => {
      response.send(books.getBooksWithPages());
    });
  }

  getRoutes() {
    this.home();
    this.listBook();
  }
}

export default Routes;
