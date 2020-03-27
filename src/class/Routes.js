/* eslint-disable no-unused-vars */
import * as express from 'express';

export default class Routes {
  constructor(app) {
    this.app = app;
  }

  home() {
    this.app.get('/', (request, response) => {
      response.send('Hello Good ol friend');
    });
  }

  getRoutes() {
    this.home();
  }
}
