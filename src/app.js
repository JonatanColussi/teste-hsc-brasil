import './config/env';

import express from 'express';
import mongoose from 'mongoose';

import router from './routes';

class App {
  constructor() {
    this.server = express();
    this.isTest = process.env.NODE_ENV === 'test';

    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.server.use(router);
  }

  database() {
    if (!this.isTest) {
      mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useCreateIndex: true,
        useNewUrlParser: true,
      });
    }
  }
}

export default new App().server;
