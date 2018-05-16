import config from "./core/config";
import Server from "./core/server";

const startTime = Date.now();

// Environment variables
if (config.debugTraceRequests) {
    process.env.DEBUG = "express:*";
}
const isDevEnvironment = process.env.NODE_ENV === "development";

// Server launch
const server = new Server(isDevEnvironment, startTime);
server.start();
