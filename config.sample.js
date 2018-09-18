module.exports = {
  // Web server
  serverPort: 8000,
  serverRootUrl: "http://localhost:8000",

  // Builds
  clientBuild: "never", // never|startup|watch

  // Debug: trace options
  logLevel: "debug",
  debugTraceRequests: false, // Traces all HTTP requests

  // TypeORM: Database config
  // - SQLite
  type: "sqlite",
  database: "data/db.sqlite",
  // - PostgreSQL
  /*type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  database: "alakajam_v2",*/

  // TypeORM: Misc
  logging: false, // Traces all SQL calls
  entities: [ "dist/server/entity/*.*" ],
  migrations: [ "dist/server/migration/*.*" ],
  synchronize: false,
  migrationsTableName: "migration",
  migrationsRun: true,
  cli: {
    migrationsDir: "server/migration"
  }
}
