/**
 * Logger configuration. Logging is done through the Winston library.
 *
 * @description ## Usage
 * ```
 * log.debug('message')
 * log.info('message')
 * log.warn('message')
 * log.error('message')
 * ```
 * @module core/log
 */

import * as moment from "moment";
import * as optionalRequire from "optional-require";
import * as path from "path";
import * as util from "util";
import * as winston from "winston";
import constants from "../constants";

export class Log {
  public winstonInstance: winston.LoggerInstance;

  constructor() {
    const appConfig = optionalRequire(require)(constants.PATH_APP_CONFIG);
    const logLevel = appConfig ? appConfig.logLevel : "info";
    this.init(logLevel);
  }

  public debug(...args: any[]): void {
    this.log("debug", args);
  }

  public info(...args: any[]): void {
    this.log("info", args);
  }

  public warn(...args: any[]): void {
    this.log("warn", args);
  }

  public error(...args: any[]): void {
    this.log("error", args);
  }

  public log(level: string, args: any[]): void {
    this.winstonInstance.log.apply(this.winstonInstance,
      [level, "\x1b[34m[" + this.getCallingFilename() + "]\x1b[0m", ...args]);
  }

  /**
   * Traces the stack of the current location in the code execution.
   */
  public whereami(): void {
    const lines = new Error().stack.split("\n");
    this.winstonInstance.info("I am" + lines.slice(2).join("\n"));
  }

  private getCallingFilename(): string {
    // Extract caller from an error stack trace
    let location = "?";
    const lines = new Error().stack.split("\n");
    for (const line of lines) {
      if (line.indexOf(constants.PATH_SOURCES_ROOT) !== -1 &&
        line.indexOf(__filename) === -1 &&
        line.indexOf("node_modules") === -1) {
        const locInfo = line.replace(/(.*\()/g, "")
          .replace(process.cwd(), "")
          .split(/[ :]/g);
        location = locInfo[locInfo.length - 3]
          .replace(/\\(dist[_a-z]+|src)\\/g, "") + ":" + locInfo[locInfo.length - 2];
        break;
      }
    }
    return location;
  }

  private init(logLevel: string) {
    winston.transports.Console.prototype.log = function (level, message, meta, callback) {
      const output = require('winston/lib/winston/common').log(Object.assign({}, this, { level: level, message: message, meta: meta }));
      console[level in console ? level : 'log'](output); 
      setImmediate(callback, null, true);
    };

    const consoleTransport = new winston.transports.Console({
      colorize: true,
      level: logLevel,
      timestamp() {
        return moment().format("YYYY-MM-DD hh:mm:ss.SSS");
      },
    });

    this.winstonInstance = new winston.Logger({
      transports: [consoleTransport],
    });

  }
}

export default new Log();
