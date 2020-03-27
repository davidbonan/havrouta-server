import ChatServer from './class/ChatServer';
import Routes from './class/Routes';

let app = new ChatServer().getApp();
const route = new Routes(app);
route.getRoutes();
export { app };
