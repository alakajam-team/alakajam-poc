import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import * as util from "util";
import config from "./config";
import log from "./log";
import * as middleware from "./middleware";

export default class Server {
  private devMode: boolean;
  private startTime: number;

  constructor(devMode: boolean, startTime: number) {
    this.devMode = devMode;
    this.startTime = startTime;
  }

  public async start(): Promise<void> {
    const app = express();
    app.disable("'x-powered-by");
    // TODO
    // await db.initDatabase(app.locals.devMode && config.DEBUG_INSERT_SAMPLES)
    await middleware.configure(app, this.devMode);
    app.listen(config.serverPort, () => {
      const startSeconds = (Date.now() - this.startTime) / 1000;
      log.warn(`Server started in ${startSeconds.toFixed(1)}s on port ${config.serverPort}.`);
      if (process.send) {
        // browser-refresh event
        process.send("online");
      }
    });
  }
}
