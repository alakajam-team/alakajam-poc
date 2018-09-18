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
import { ConnectionOptions } from "typeorm";
import { ConfigureOptions } from "nunjucks";

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

export declare type Config = ConnectionOptions & {

  readonly serverPort: string;
  
  readonly serverRootUrl: string;

  readonly clientBuild: "startup"|"watch"|"never";

  /**
   * Verbose level among 'none', 'error', 'warn', 'info', 'debug'
   */
  readonly logLevel: string;

  /**
   * Enables Express debug mode to trace request routes & timing
   */
  readonly debugTraceRequests: boolean;

};

/**
 * General configuration of the application
 */
export class ConfigService {
  public static instance = {};
  
  public static load(reference: Partial<Config>): void {
    Object.keys(reference)
      .forEach(key => ConfigService.instance[key] = reference[key]);
  }

  public static async loadFromFile(configPath: string, options: ConfigOptions = {}): Promise<ConfigWarning[]> {
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

export default ConfigService.instance as Config;
