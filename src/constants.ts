/**
 * Application constants
 *
 * @module constants
 */

import * as path from "path";

const PATH_SOURCES_ROOT = path.join(__dirname, "..");

export default {
    PATH_APP_CONFIG: path.join(PATH_SOURCES_ROOT, "appconfig.json"),
    PATH_APP_CONFIG_SAMPLE: path.join(PATH_SOURCES_ROOT, "appconfig.sample.json"),
    PATH_SOURCES_ROOT,
};
