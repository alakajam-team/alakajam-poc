/**
 * Application constants
 *
 * @module constants
 */

import * as path from "path";

const PATH_SOURCES_ROOT = path.join(__dirname, "..");

export default {
  PATH_APP_CONFIG: path.join(PATH_SOURCES_ROOT, "config.json"),
  PATH_APP_CONFIG_SAMPLE: path.join(PATH_SOURCES_ROOT, "config.sample.json"),
  PATH_SOURCES_ROOT,
  PATH_TEMPLATES: path.join(PATH_SOURCES_ROOT, "templates"),
};
