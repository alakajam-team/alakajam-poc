const launchTime = Date.now();

if (__filename.includes(".js")) {
  // Fix root-relative import paths from build
  // tslint:disable-next-line: no-var-requires
  require("module-alias/register");
}

import * as path from "path";
import "reflect-metadata";
import config, { ConfigService } from "./config";
import constants from "./constants";
import clientBuild from "./core/client-build";
import db from "./core/db";
import environment, { EnvironmentImpl } from "./environment";

(async () => {

  // Initialize server config
  const configWarnings = await ConfigService.loadFromFile(
    path.join(constants.PATH_SOURCES_ROOT, "config.js"),
    { createIfMissing: true });

  // Initialize DB connection
  let patchedOrmConfigTsNode = false;
  if (process.argv.includes("patch-ormconfig-ts-node")) {
    await ConfigService.load({
      entities: [ "server/entity/*.*" ],
      migrations: [ "server/migration/*.*" ],
    });
    patchedOrmConfigTsNode = true;
  }
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

  // Uncaught errors
  process.on("uncaughtException", (e) => log.error(e));
  process.on("unhandledRejection", (e) => log.error(e));

  // Configure client build
  await clientBuild.configure();

  // Launch server
  const app = require("./core/app");
  app.launch();

})();
