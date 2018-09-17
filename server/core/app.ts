import * as fs from "fs";
import * as path from "path";
import * as util from "util";
import * as express from "express";
import * as expressNunjucks from "express-nunjucks";
import * as webpack from "webpack";
import * as mkdirp from "mkdirp";
import config from "../config";
import constants from "../constants";
import * as routes from "../controller/routes";
import environment from "../environment";
import enums from "./enums";
import log from "./log";
import middlewareFilters from "./template-filters";

const fsAccessPromise = util.promisify(fs.access);

/**
 * The Alakajam! web server.
 */
export class App {

  public async launch(): Promise<void> {
    if (config.AUTO_BUILD_JS) {
      await this.buildJs();
    }
    await this.startExpress();
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
    app.listen(config.SERVER_PORT, () => {
      const launchSeconds = (Date.now() - environment.launchTime) / 1000;
      log.warn(`Server launched in ${launchSeconds.toFixed(1)}s on port ${config.SERVER_PORT}.`);
      if (process.send) {
        // browser-refresh event
        process.send("online");
      }
    });

    return;
  }

  private async buildJs(watch: boolean = false): Promise<void> {
    const config = require(path.join(constants.PATH_SOURCES_ROOT, 'webpack.' + environment.name))
  
    await this.createFolderIfMissing(path.join(constants.PATH_SOURCES_ROOT, config.output.path))
  
    const compiler = webpack(config)
  
    await new Promise(function (resolve, reject) {
      function callback (err, stats) {
        // https://webpack.js.org/api/node/#error-handling
  
        if (err) {
          // This means an error in webpack or its configuration, not an error in
          // the compiled sources.
          log.error(err.stack || err)
          if (err.details) {
            log.error(err.details)
          }
          return
        }
  
        let logMethod = log.info.bind(log)
        if (stats.hasErrors()) {
          logMethod = log.error.bind(log)
        } else if (stats.hasWarnings()) {
          logMethod = log.warn.bind(log)
        }
        logMethod(stats.toString(config.stats))
  
        resolve()
      }
  
      if (watch) {
        log.info('Setting up automatic JS build...')
        compiler.watch(config.watchOptions || {}, callback)
      } else {
        log.info('Building JS...')
        compiler.run(callback)
      }
    })
  }

  /**
   * Creates a folder. No-op if the folder exists.
   */
  private async createFolderIfMissing (folderPath) {
    try {
      await fsAccessPromise(folderPath, fs.constants.R_OK)
    } catch (e) {
      await mkdirp(folderPath)
    }
  }
  
}

export default new App();
