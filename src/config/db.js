import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database:
    process.env.NODE_ENV === "test"
      ? process.env.DB_NAME_TEST
      : process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client:", err);
});

export const testConnection = async () => {
  let retries = 5;
  let delay = 2000;

  while (retries > 0) {
    try {
      await pool.query("SELECT 1");
      console.log("Database connection verified");
      return;
    } catch (err) {
      retries--;
      console.error(`Database connection failed. Retries left: ${retries}`);
      if (retries === 0) {
        console.error("Failed to connect to database after all retries");
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};

export const closeDB = async () => {
  console.log("Closing database connection...");
  await pool.end();
  console.log("Database connection closed");
};

export default pool;
