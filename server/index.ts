const launchTime = Date.now();

import * as path from "path";
import "reflect-metadata";
import config, { ConfigService } from "./config";
import db from "./core/db";
import environment, { EnvironmentImpl } from "./environment";
import constants from "./constants";

(async () => {

  // Initialize app config
  const configWarnings = await ConfigService.loadFromFile(
    path.join(constants.PATH_SOURCES_ROOT, "config.js"),
    { createIfMissing: true });
  let patchedOrmConfigTsNode = false;
  if (process.argv.includes("patch-ormconfig-ts-node")) {
    await ConfigService.load({
      entities: [ "server/entity/*.*" ],
      migrations: [ "server/migration/*.*" ]
    });
    patchedOrmConfigTsNode = true;
  }

  // Initialize DB connection
  await db.connect();

  // Initialize environment info
  const environmentImpl = environment as EnvironmentImpl;
  environmentImpl.name = (process.env.NODE_ENV === "production") ? "production" : "development";
  environmentImpl.launchTime = launchTime;

  // We can now start require()-ing our sources
  // If we did earlier, they would have used uninitialized versions of the config/DB/environment.
  
  // Initialization output
  const log = require("./core/log").default;
  configWarnings.map((warning) => log.warn(warning.message));
  if (patchedOrmConfigTsNode) {
    log.info("ts-node compatibility: patched config so that TypeORM uses the original entities and migrations");
  }
  log.debug("Connected to database with settings:", config);

  // Launch server
  const app = require("./core/app").default;
  app.launch();

})();
