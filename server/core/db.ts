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
    let connectionOptions: ConnectionOptions = config;
    log.debug("Connecting to database with settings:", connectionOptions);
    this.connectionInstance = await createConnection(connectionOptions);
  }
}

export default new DB();
