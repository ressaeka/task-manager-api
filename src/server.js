import app from './app.js';
import dotenv from "dotenv";
import { closeDB } from './config/db.js';

dotenv.config();

// Validasi env variables
const requiredEnvVars = [
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'DB_USER',
  'DB_HOST',
  'DB_NAME',
  'DB_PASSWORD',
  'DB_PORT',
  'DB_NAME_TEST'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:');
  missingEnvVars.forEach(envVar => console.error(`   - ${envVar}`));
  console.error('\nPlease check your .env file');
  process.exit(1);
}

console.log('Environment variables validated');

const port = process.env.PORT || 3000;

const host = process.env.HOST || (
  process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost"
);

const server = app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});

// error handle saat server start
server.on("error", (error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});

// graceful shutdown handler
const shutdown = async (signal) => {
  console.log(`${signal} received, shutting down ...`);

  server.close(async () => {
    await closeDB();
    console.log("Server closed successfully");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

