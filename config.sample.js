module.exports = {
  // Web server
  SERVER_PORT: 8000,
  SERVER_ROOT_URL: "http://localhost:8000",

  // Database: SQLite
  DB_TYPE: 'sqlite3',
  DB_HOST: 'localhost',
  DB_USER: 'root',
  DB_PASSWORD: '',
  DB_NAME: '',
  DB_SQLITE_FILENAME: 'data/db.sqlite',

  // Database: PostgreSQL
  /*DB_TYPE: 'postgresql',
  DB_HOST: 'localhost',
  DB_USER: 'postgres',
  DB_PASSWORD: 'postgres',
  DB_NAME: 'alakajam',*/

  // Debug: trace options
  LOG_LEVEL: "debug"
}