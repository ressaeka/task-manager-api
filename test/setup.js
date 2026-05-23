import dotenv from "dotenv";
dotenv.config();

// fallback untuk test environment
process.env.JWT_SECRET = process.env.JWT_SECRET || "test_secret_key";
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
process.env.NODE_ENV = "test";
