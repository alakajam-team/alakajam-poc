import { Connection, createConnection } from "typeorm";

export default class DB {
  private connection: Connection;

  public async connect() {
    // TODO
    this.connection = await createConnection({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "test",
      password: "test",
      database: "test",
    });
  }

}
