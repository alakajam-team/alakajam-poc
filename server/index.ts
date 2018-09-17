const launchTime = Date.now();

import * as path from "path";
import "reflect-metadata";
import config, { ConfigImpl } from "./config";
import db from "./core/db";
import environment, { EnvironmentImpl } from "./environment";
import constants from "./constants";

(async () => {

  // Override environment variables
  if (config.DEBUG_TRACE_REQUESTS) {
    process.env.DEBUG = "express:*";
  }

  // Initialize app config + DB connection + environment info, before requiring any other app sources
  const configImpl = config as ConfigImpl;
  const configWarnings = await configImpl.loadFromFile(
    path.join(constants.PATH_SOURCES_ROOT, "config.js"),
    { createIfMissing: true });
  await db.connect(configImpl);

  const environmentImpl = environment as EnvironmentImpl;
  environmentImpl.name = (process.env.NODE_ENV === "development") ? "development" : "production";
  environmentImpl.launchTime = launchTime;

  // Launch server
  const log = require("./core/log").default;
  configWarnings.map((warning) => log.warn(warning.message));
  const app = require("./core/app").default;
  app.launch();

})();
