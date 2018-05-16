/**
 * Configuration loading.
 *
 * @module core/config
 */

import * as fs from "fs";
import * as optionalRequire from "optional-require";
import * as path from "path";
import * as appConfigSample from "../../appconfig.sample.json";
import constants from "../constants";
import log from "./log";

// Config type definition
export class AppConfig {
    public serverPort: number;
    public serverRootUrl: string;

    /**
     * Verbose level among 'none', 'error', 'warn', 'info', 'debug'
     */
    public logLevel: string;
}

// Load or create user config
const appConfig = optionalRequire(require)(constants.PATH_APP_CONFIG);
if (!appConfig) {
    const sampleConfigBuffer = fs.readFileSync(constants.PATH_APP_CONFIG_SAMPLE);
    fs.writeFileSync(constants.PATH_APP_CONFIG, sampleConfigBuffer);
    log.info(constants.PATH_APP_CONFIG, "initialized with sample values");
} else {
    // Use default values if some keys are missing
    for (const key in appConfigSample) {
        if (appConfig[key] === undefined && (key !== "DB_SQLITE_FILENAME" || appConfig.DB_TYPE === "sqlite3")) {
            log.warn('Key "' + key + '" missing from config.js, using default value "' +
                appConfigSample[key] + '"');
            appConfig[key] = appConfigSample[key];
        }
    }
}

export default appConfig as AppConfig;
