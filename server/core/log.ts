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
import * as winston from "winston";
import config from "../config";
import constants from "../constants";

/**
 * A logger that uses Winston under the hood,
 * prepending the output with the log level and location in the code.
 */
export class Log {
  public winstonInstance: winston.LoggerInstance;

  /**
   * Creates a new logger pointing at the console.
   */
  constructor() {
    winston.transports.Console.prototype.log = function(level, message, meta, callback) {
      const output = require("winston/lib/winston/common").log(Object.assign({}, this, { level, message, meta }));
      console[level in console ? level : "log"](output);
      setImmediate(callback, null, true);
    };

    const consoleTransport = new winston.transports.Console({
      colorize: true,
      level: config.LOG_LEVEL,
      timestamp() {
        return moment().format("YYYY-MM-DD hh:mm:ss.SSS");
      },
    });

    this.winstonInstance = new winston.Logger({
      transports: [consoleTransport],
    });
  }

  /**
   * Logs a debug-level message.
   * @param args
   */
  public debug(...args: any[]): void {
    this.log("debug", args);
  }

  /**
   * Logs an info-level message.
   * @param args
   */
  public info(...args: any[]): void {
    this.log("info", args);
  }

  /**
   * Logs a warn-level message.
   * @param args
   */
  public warn(...args: any[]): void {
    this.log("warn", args);
  }

  /**
   * Logs an error-level message.
   * @param args
   */
  public error(...args: any[]): void {
    this.log("error", args);
  }

  /**
   * Logs a message, letting you pass the level dynamically.
   * @param level
   * @param args
   */
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
}

export default new Log();
