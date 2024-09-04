import "dotenv/config";

// Load environment variables
const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

// Validate required environment variables
if (
  !PORT ||
  !DB_HOST ||
  !DB_PORT ||
  !DB_USERNAME ||
  !DB_PASSWORD ||
  !DB_DATABASE
) {
  throw new Error("Missing required environment variables.");
}

// Export environment variables
export { PORT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE };
