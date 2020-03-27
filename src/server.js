/* eslint-disable import/prefer-default-export */
import ChatServer from './class/ChatServer';
import Routes from './class/Routes';

const app = new ChatServer().getApp();
const route = new Routes(app);
route.getRoutes();
export { app };
