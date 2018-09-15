/**
 * Application constants
 *
 * @module constants
 */

import * as path from "path";

const PATH_SOURCES_ROOT = path.join(__dirname, "..");

const constants = {
  PATH_SOURCES_ROOT,
  PATH_SERVER: path.join(PATH_SOURCES_ROOT, "server"),
  PATH_APP_CONFIG_SAMPLE: path.join(PATH_SOURCES_ROOT, "config.sample.json"),
  PATH_TEMPLATES: path.join(PATH_SOURCES_ROOT, "templates"),
};

export default constants;
