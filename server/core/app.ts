import * as express from "express";
import * as expressNunjucks from "express-nunjucks";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";
import * as util from "util";
import * as webpack from "webpack";
import config from "../config";
import constants from "../constants";
import * as routes from "../controller/routes";
import environment from "../environment";
import clientBuild from "./client-build";
import log from "./log";
import templatingFilters from "./templating/templating-filters";
import templateGlobals from "./templating/templating-globals";

/**
 * The Alakajam! web server.
 */
export class App {

  public async launch(): Promise<void> {
    await clientBuild.configure();

    // Environment variables
    if (config.debugTraceRequests) {
      process.env.DEBUG = "express:*";
    }

    // App init
    const app = express();
    app.disable("x-powered-by");
    app.locals.config = config;
    app.locals.devMode = environment.devMode;

    // Templating engine
    app.set("views", constants.PATH_TEMPLATES);
    const nunjucks = expressNunjucks(app, {
      noCache: environment.devMode,
      watch: environment.devMode,
    });

    // Templating globals
    Object.keys(templateGlobals).map((key) => {
      nunjucks.env.addGlobal(key, templateGlobals[key]);
    });
    nunjucks.env.addGlobal("context", function() {
      // Devs can display the whole templating context with: {{ context() | prettyDump | safe }}
      return Object.assign(this.ctx, templateGlobals);
    });

    // Templating filters
    Object.keys(templatingFilters).map((key) => {
      nunjucks.env.addFilter(key, templatingFilters[key]);
    });

    // Controllers
    routes.initRoutes(app);

    // Listen to port
    app.listen(config.serverPort, () => {
      const launchSeconds = (Date.now() - environment.launchTime) / 1000;
      log.warn(`Server launched in ${environment.name} mode on port `
        + `${config.serverPort} (took ${launchSeconds.toFixed(1)}s).`);
      if (process.send) {
        // browser-refresh event
        process.send("online");
      }
    });

    return;
  }

}

export default new App();
