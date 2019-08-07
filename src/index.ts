import { Server } from "./server";
import { WebServer } from "./webServer";

const PORT = 8080;
const ADDRESS = '127.0.0.1';

const server = new WebServer(PORT, ADDRESS);
server.start();