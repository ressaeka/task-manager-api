import express from "express";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import { requestTimeout } from "./middlewares/timeout.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import { sanitizeInput } from "./middlewares/sanitize.js";
import securityMiddleware from "./middlewares/security.js";
import "./config/db.js";

// instance dari Express
const app = express();

// core middleware
app.use(securityMiddleware);

// request logging & timeout (before parsing)
app.use(requestLogger);
app.use(requestTimeout(30000));

// parsing JSON dari request body
app.use(express.json());

// input sanitization (after parsing)
app.use(sanitizeInput);

// health check (no rate limit)
app.use("/health", healthRoutes);

// global rate limiter
app.use(apiLimiter);

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/admin", adminRoutes);

// route jika tidak ada atau failed
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found"
  });
});


// error handling
app.use(errorHandler);

// export app ke server.js
export default app;
