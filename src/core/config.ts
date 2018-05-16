/**
 * Configuration loading.
 *
 * @module core/config
 */

import * as fs from "fs";
import * as optionalRequire from "optional-require";
import * as path from "path";
import * as appConfigSample from "../../appconfig.sample";
import log from "./log";

const APP_CONFIG_PATH = path.join(__dirname, "../../appconfig.js");
const APP_CONFIG_SAMPLE_PATH = path.join(__dirname, "../../appconfig.sample.js");

// Module declaration (TOASTY: how would I put that in a separate .d.ts file?)
declare module "./config" {
    export const SERVER_PORT: number;
}

// Load user config
const appConfig = optionalRequire(require)(APP_CONFIG_PATH);

// Create config file if missing
log.info(typeof appConfig);
if (!appConfig) {
    const sampleConfigBuffer = fs.readFileSync(APP_CONFIG_SAMPLE_PATH);
    fs.writeFileSync(APP_CONFIG_PATH, sampleConfigBuffer);
    log.info(APP_CONFIG_PATH, "initialized with sample values");
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

// Expose either user config or the sample one
export default (appConfig || appConfigSample);
