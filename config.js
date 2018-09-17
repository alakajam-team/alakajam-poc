module.exports = {
  // Web server
  SERVER_PORT: 8000,
  SERVER_ROOT_URL: "http://localhost:8000",

  // Builds
  AUTO_BUILD_JS: false,

  // Database: SQLite
  /*DB_TYPE: 'sqlite3',
  DB_HOST: 'localhost',
  DB_USER: 'root',
  DB_PASSWORD: '',
  DB_NAME: '',
  DB_SQLITE_FILENAME: 'data/db.sqlite',*/

  // Database: PostgreSQL
  DB_TYPE: 'postgresql',
  DB_HOST: 'localhost',
  DB_USER: 'postgres',
  DB_PASSWORD: 'root',
  DB_NAME: 'alakajam_v2',

  // Debug: trace options
  LOG_LEVEL: "debug"
}
