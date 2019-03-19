import * as expressNunjucks from "express-nunjucks";
import * as core from "express-serve-static-core";
import constants from "server/constants";
import environment from "server/environment";
import templatingFilters from "./templating-filters";
import templatingGlobals from "./templating-globals";

export function configure(app: core.Express) {
  // Templating engine
  app.set("views", constants.PATH_TEMPLATES);
  const nunjucks = expressNunjucks(app, {
    noCache: environment.devMode,
    watch: environment.devMode,
    trimBlocks: true,
    lstripBlocks: true,
    globals: templatingGlobals,
  });

  // Let devs display the whole templating context with: {{ context() | prettyDump | safe }}
  nunjucks.env.addGlobal("context", function() {
    return Object.assign(this.ctx, templatingGlobals);
  });

  // Templating filters
  Object.keys(templatingFilters).map((key) => {
    nunjucks.env.addFilter(key, templatingFilters[key]);
  });
}
