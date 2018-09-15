import * as express from "express";
import * as expressNunjucks from "express-nunjucks";
import * as fs from "fs";
import * as nunjucks from "nunjucks";
import * as path from "path";
import * as util from "util";
import constants from "../constants";
import * as routes from "../controllers/routes";
import config from "./config";
import enums from "./enums";
import log from "./log";
import middlewareFilters from "./middleware-filters";

const LAUNCH_TIME = new Date().getTime();

export function configure(
  app: express.Express,
  devMode: boolean
): Promise<void> {
  // Application locals
  app.locals.config = config;
  app.locals.devMode = devMode;

  // Templating engine
  app.set("views", constants.PATH_TEMPLATES);
  const templating = expressNunjucks(app, {
    noCache: devMode,
    watch: devMode
  });

  // Templating globals
  const globals = {
    browserRefreshUrl: process.env.BROWSER_REFRESH_URL,
    constants,
    enums,
    devMode,
    launchTime: LAUNCH_TIME
  };
  Object.keys(globals).map(key => templating.env.addGlobal(key, globals[key]));
  templating.env.addGlobal("context", function () {
    // lets devs display the whole templating context with
    // {{ context() | prettyDump | safe }}
    this.ctx.constants = constants;
    this.ctx.enums = enums;
    this.ctx.devMode = app.locals.devMode;
    this.ctx.launchTime = LAUNCH_TIME;
    return this.ctx;
  });
  /*
    TODO
    for (var functionName in templating) {
        nj.env.addGlobal(functionName, templating[functionName])
    }
    */

  // Templating filters
  Object.keys(middlewareFilters).map(key =>
    templating.env.addFilter(key, middlewareFilters[key])
  );

  // Controllers
  routes.initRoutes(app);

  return;
}
