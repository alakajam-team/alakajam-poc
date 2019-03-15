
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";
import config from "server/config";
import constants from "server/constants";
import environment from "server/environment";
import * as util from "util";
import * as webpack from "webpack";
import log from "./log";

const fsAccessPromise = util.promisify(fs.access);

class ClientBuild {

  public async configure(): Promise<void> {
    if (config.clientBuild === "never") {
      log.info(
        "client build disabled. If you change something in 'client/', you'll have to build the sources manually." +
          " Example: webpack-cli --config webpack.production.js",
      );
      return;
    }

    const webpackConfig = require(path.join(
      constants.PATH_SOURCES_ROOT,
      "webpack." + environment.name,
    ));

    await this.createFolderIfMissing(path.join(constants.PATH_SOURCES_ROOT, webpackConfig.output.path));

    const compiler = webpack(webpackConfig);

    await new Promise((resolve) => {
      if (config.clientBuild === "watch") {
        log.info("Setting up automatic client build...");
        compiler.watch(webpackConfig.watchOptions || {}, callback);
      } else {
        log.info("Building client sources...");
        compiler.run(callback);
      }

      function callback(err, stats) {
        // https://webpack.js.org/api/node/#error-handling
        if (err) {
          // This means an error in webpack or its configuration, not an error in the compiled sources.
          log.error(err.stack || err);
          if (err.details) {
            log.error(err.details);
          }
          return;
        }

        // Print build stats (or errors)
        let logFunction;
        if (stats.hasErrors()) {
          logFunction = log.error.bind(log);
        } else if (stats.hasWarnings()) {
          logFunction = log.warn.bind(log);
        } else {
          logFunction = log.info.bind(log);
        }
        logFunction(stats.toString(webpackConfig.stats));

        resolve();
      }

    });
  }

  /**
   * Creates a folder. No-op if the folder exists.
   */
  private async createFolderIfMissing(folderPath) {
    try {
      await fsAccessPromise(folderPath, fs.constants.R_OK);
    } catch (e) {
      await mkdirp(folderPath);
    }
  }

}

export default new ClientBuild();
