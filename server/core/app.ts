import * as express from "express";
import * as expressNunjucks from "express-nunjucks";
import config from "../config";
import constants from "../constants";
import * as routes from "../controllers/routes";
import environment from "../environment";
import enums from "./enums";
import log from "./log";
import middlewareFilters from "./template-filters";

/**
 * The Alakajam! web server.
 */
export class App {

  public async launch(): Promise<void> {
    await Promise.all([this.initDatabase(), this.startExpress()]);
  }

  private async initDatabase(): Promise<void> {
    // TODO
  }

  private async startExpress(): Promise<void> {
    const app = express();
    app.disable("x-powered-by");

    // Application locals
    app.locals.config = config;
    app.locals.devMode = environment.devMode;

    // Templating engine
    app.set("views", constants.PATH_TEMPLATES);
    const templating = expressNunjucks(app, {
      noCache: environment.devMode,
      watch: environment.devMode,
    });

    // Templating globals
    const globals = {
      browserRefreshUrl: process.env.BROWSER_REFRESH_URL,
      constants,
      enums,
      devMode: environment.devMode,
      launchTime: environment.launchTime,
    };
    Object.keys(globals).map((key) => templating.env.addGlobal(key, globals[key]));
    templating.env.addGlobal("context", function() {
      // Devs can display the whole templating context with: {{ context() | prettyDump | safe }}
      return Object.assign(this.ctx, globals);
    });

    // Templating filters
    Object.keys(middlewareFilters).map((key) =>
      templating.env.addFilter(key, middlewareFilters[key]),
    );

    // Controllers
    routes.initRoutes(app);

    // Listen to port
    app.listen(config.serverPort, () => {
      const launchSeconds = (Date.now() - environment.launchTime) / 1000;
      log.warn(`Server launched in ${launchSeconds.toFixed(1)}s on port ${config.serverPort}.`);
      if (process.send) {
        // browser-refresh event
        process.send("online");
      }
    });

    return;
  }

}

export default new App();
