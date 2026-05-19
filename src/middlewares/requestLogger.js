import { v4 as uuidv4 } from "uuid";

export const requestLogger = (req, res, next) => {
  const requestId = req.headers["x-request-id"] || uuidv4();
  req.requestId = requestId;
  res.setHeader("X-Request-ID", requestId);

  const start = Date.now();

  const originalEnd = res.end;
  res.end = function (...args) {
    const duration = Date.now() - start;
    const log = {
      requestId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    };

    if (res.statusCode >= 500) {
      console.error("REQUEST ERROR:", JSON.stringify(log));
    } else {
      console.log("REQUEST:", JSON.stringify(log));
    }

    originalEnd.apply(res, args);
  };

  next();
};