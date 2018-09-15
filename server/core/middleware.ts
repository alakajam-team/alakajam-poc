import * as express from "express";
import * as expressNunjucks from "express-nunjucks";
import config from "../config";
import constants from "../constants";
import * as routes from "../controllers/routes";
import enums from "./enums";
import templateFilters from "./template-filters";

export function configure(app: express.Express, devMode: boolean, startTime: number): Promise<void> {
  // Application locals
  app.locals.config = config;
  app.locals.devMode = devMode;

  // Templating engine
  app.set("views", constants.PATH_TEMPLATES);
  const templating = expressNunjucks(app, {
    noCache: devMode,
    watch: devMode,
  });

  // Templating globals
  const globals = {
    browserRefreshUrl: process.env.BROWSER_REFRESH_URL,
    constants,
    enums,
    devMode,
    launchTime: startTime,
  };
  Object.keys(globals).map((key) => templating.env.addGlobal(key, globals[key]));
  templating.env.addGlobal("context", function() {
    // lets devs display the whole templating context with
    // {{ context() | prettyDump | safe }}
    this.ctx.constants = constants;
    this.ctx.enums = enums;
    this.ctx.devMode = app.locals.devMode;
    this.ctx.launchTime = startTime;
    return this.ctx;
  });
  /*
    TODO
    for (var functionName in templating) {
        nj.env.addGlobal(functionName, templating[functionName])
    }
    */

  // Templating filters
  Object.keys(templateFilters).map((key) =>
    templating.env.addFilter(key, templateFilters[key]),
  );

  // Controllers
  routes.initRoutes(app);

  return;
}
