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
  readonly SERVER_PORT: number;

  readonly SERVER_ROOT_URL: string;

  readonly CLIENT_BUILD: "startup"|"watch"|"never";

  readonly DB_TYPE: "postgresql"|"sqlite";

  readonly DB_HOST: string;

  readonly DB_USER: string;

  readonly DB_PASSWORD: string;

  readonly DB_NAME: string;

  readonly DB_SQLITE_FILENAME: string;

  /**
   * Enables Express debug mode to trace request routes & timing
   */
  readonly DEBUG_TRACE_REQUESTS: boolean;

  /**
   * Verbose level among 'none', 'error', 'warn', 'info', 'debug'
   */
  readonly LOG_LEVEL: string;

  readonly DEBUG_TRACE_SQL: boolean;
}

/**
 * General configuration of the application
 */
export class ConfigImpl implements Config {
  readonly SERVER_PORT: number;
  readonly SERVER_ROOT_URL: string;
  readonly CLIENT_BUILD: "startup"|"watch"|"never";
  readonly DB_TYPE: "postgresql"|"sqlite";
  readonly DB_HOST: string;
  readonly DB_USER: string;
  readonly DB_PASSWORD: string;
  readonly DB_NAME: string;
  readonly DB_SQLITE_FILENAME: string;
  readonly DEBUG_TRACE_REQUESTS: boolean;
  readonly LOG_LEVEL: string;
  readonly DEBUG_TRACE_SQL: boolean;

  public load(config: ConfigImpl): void {
    Object.keys(config)
      .forEach((key) => this[key] = config[key]);
  }

  public async loadFromFile(configPath: string, options: ConfigOptions = {}): Promise<ConfigWarning[]> {
    if (!path.isAbsolute(configPath)) {
      throw new Error("Config file path must be absolute");
    }

    // Read config file
    const warnings: ConfigWarning[] = [];
    let config = optionalRequire(require)(configPath);

    if (!config) {
      // Use sample if missing
      config = require(constants.PATH_APP_CONFIG_SAMPLE);
      if (options.createIfMissing) {
        // Create config file from sample
        const sampleConfigBuffer = await readFilePromise(constants.PATH_APP_CONFIG_SAMPLE);
        await writeFilePromise(configPath, sampleConfigBuffer);
        warnings.push({ message: `initialized options file with sample values: ${configPath}` });
      }
    } else {
      // Fill existing config at runtime with sample in case of missing keys
      const configSample: Config = require(configPath);
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
