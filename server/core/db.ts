import * as path from "path";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { Config } from "../config";
import log from "./log";

/**
 * Connection to a relational database (PostgreSQL or SQLite), through the TypeORM library.
 */
export class DB {
  private connectionInstance: Connection = null;

  public get connection() {
    if (this.connectionInstance == null) { throw new Error("No DB connection, please call connect() first"); }
    return this.connectionInstance;
  }

  public async connect(config: Config) {
    // Build options object
    let connectionOptions: ConnectionOptions;
    const entities = [path.join(__dirname, "../entity/*.*")]
    if (config.DB_TYPE === "sqlite") {
      connectionOptions = {
        type: "sqlite",
        database: config.DB_SQLITE_FILENAME,
        entities,
        synchronize: true, // TODO Migrations
        logging: config.DEBUG_TRACE_SQL
      };
    } else {
      connectionOptions = {
        type: "postgres",
        host: config.DB_HOST,
        username: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
        entities,
        synchronize: true, // TODO Migrations
        logging: config.DEBUG_TRACE_SQL
      };
    }

    // Connect
    log.debug("Connecting with settings:", connectionOptions);
    this.connectionInstance = await createConnection(connectionOptions);
  }

}

export default new DB();
