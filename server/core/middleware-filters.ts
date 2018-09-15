import * as express from "express";
import * as expressNunjucks from "express-nunjucks";
import * as fs from "fs";
import * as moment from "moment";
import * as nunjucks from "nunjucks";
import * as path from "path";
import * as util from "util";
import config from "./config";
import log from "./log";

export default {
  keys: obj => Object.keys(obj),
  values: obj => Object.values(obj),
  pretty: obj => JSON.stringify(obj, null, 2),
  relativeTime: date => moment(date).utc().fromNow()
};
