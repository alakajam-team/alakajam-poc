/**
 * Application constants
 *
 * @module constants
 */

import { sync as findUpSync } from "find-up";
import * as path from "path";

const PATH_SOURCES_ROOT = path.dirname(findUpSync("package.json"));

const constants = {
  PATH_SOURCES_ROOT,
  PATH_APP_CONFIG_SAMPLE: path.join(PATH_SOURCES_ROOT, "config.sample.js"),
  PATH_TEMPLATES: path.join(PATH_SOURCES_ROOT, "templates"),
};

export default constants;
