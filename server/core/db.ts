import { Connection, ConnectionOptions, createConnection } from "typeorm";
import config from "../config";

/**
 * Connection to a relational database (PostgreSQL or SQLite), through the TypeORM library.
 */
export class DB {
  private connectionInstance: Connection = null;

  public get connection() {
    if (this.connectionInstance == null) { throw new Error("no DB connection, please call connect() first"); }
    return this.connectionInstance;
  }

  public async connect() {
    this.connectionInstance = await createConnection(config);
  }
}

export default new DB();
