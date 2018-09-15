const launchTime = Date.now();

import "reflect-metadata";
import config, { ConfigImpl } from "./config";
import log from "./core/log";
import environment, { EnvironmentImpl } from "./environment";

(async () => {

  // Override environment variables
  if (config.debugTraceRequests) {
    process.env.DEBUG = "express:*";
  }

  // Initialize config & environment before requiring any other app sources
  const configImpl = config as ConfigImpl;
  const configWarnings = await (config as ConfigImpl).loadFromFile("../config.json");
  configWarnings.map((warning) => log.warn(warning.message));
  const environmentImpl = environment as EnvironmentImpl;
  environmentImpl.devMode = process.env.NODE_ENV === "development";
  environmentImpl.launchTime = launchTime;

  // Launch server
  const app = require("./core/app").default;
  app.launch();

})();
