/**
 * Application constants
 *
 * @module constants
 */

import * as path from "path";

const PATH_SOURCES_ROOT = path.join(__dirname, "..");

export default {
  PATH_SOURCES_ROOT,
  PATH_APP_CONFIG_SAMPLE: path.join(PATH_SOURCES_ROOT, "config.sample.js"),
  PATH_TEMPLATES: path.join(PATH_SOURCES_ROOT, "templates"),
};
