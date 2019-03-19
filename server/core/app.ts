import * as express from "express";
import config from "../config";
import * as routes from "../controller/routes";
import environment from "../environment";
import log from "./log";
import * as templating from "./templating/templating";

/**
 * The Alakajam! web server.
 */
export async function launch(): Promise<void> {
    // Environment variables
    if (config.debugTraceRequests) {
      process.env.DEBUG = "express:*";
    }

    // App init
    const app = express();
    app.disable("x-powered-by");
    app.locals.config = config;
    app.locals.devMode = environment.devMode;

    // Templating
    templating.configure(app);
    routes.configure(app);

    // Port binding
    app.listen(config.serverPort, () => {
      const launchSeconds = (Date.now() - environment.launchTime) / 1000;
      log.warn(`Server launched in ${environment.name} mode on port `
        + `${config.serverPort} (took ${launchSeconds.toFixed(1)}s).`);

      // browser-refresh event
      if (process.send) {
        process.send("online");
      }
    });
  }
