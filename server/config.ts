/**
 * Configuration loading.
 *
 * @module core/config
 */

import * as fs from "fs";
import * as optionalRequire from "optional-require";
import * as path from "path";
import * as util from "util";
import constants from "./constants";

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

export interface Config {
  readonly serverPort: number;

  readonly serverRootUrl: string;

  /**
   * Verbose level among 'none', 'error', 'warn', 'info', 'debug'
   */
  readonly logLevel: string;

  /**
   * Enables Express debug mode to trace request routes & timing
   */
  readonly debugTraceRequests: boolean;

}

/**
 * General configuration of the application
 */
export class ConfigImpl implements Config {
  public readonly serverPort: number;
  public readonly serverRootUrl: string;
  public readonly logLevel: string;
  public readonly debugTraceRequests: boolean;

  public load(config: ConfigImpl): void {
    Object.keys(config)
      .forEach((key) => this[key] = config[key]);
  }

  public async loadFromFile(configPath: string, options: ConfigOptions = {}): Promise<ConfigWarning[]> {
    // Read config file
    const absConfigPath = path.isAbsolute(configPath) ? configPath : path.join(constants.PATH_SERVER, configPath);
    const warnings: ConfigWarning[] = [];
    const config = optionalRequire(require)(absConfigPath);

    if (!config) {
      // Use sample if missing
      const sampleConfigBuffer = await readFilePromise(constants.PATH_APP_CONFIG_SAMPLE);
      if (options.createIfMissing) {
        // Create config file from sample
        await writeFilePromise(absConfigPath, sampleConfigBuffer);
        warnings.push({ message: `initialized options file with sample values: ${path}` });
      }
    } else {
      // Fill existing config at runtime with sample in case of missing keys
      const configSample: Config = require(absConfigPath);
      for (const key in configSample) {
        if (config[key] === undefined && (key !== "DB_SQLITE_FILENAME" || config.DB_TYPE === "sqlite3")) {
          warnings.push({ message: `key "${key}" missing from ${path}, using default value "${configSample[key]}"` });
          config[key] = configSample[key];
        }
      }
    }

    // Assign
    this.load(config);

    return warnings;
  }
}

export interface ConfigOptions {
  createIfMissing?: boolean;
}

export interface ConfigWarning {
  message: string;
}

export default new ConfigImpl() as Config;
