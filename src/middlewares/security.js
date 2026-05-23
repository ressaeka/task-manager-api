import helmet from "helmet";
import cors from "cors";

const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
];

// security layer
const securityMiddleware = [
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin"}
    }),
    cors({
        origin: process.env.CORS_ORIGIN
          ? process.env.CORS_ORIGIN.split(',')
          : defaultOrigins,
        methods:["GET", "POST", "PUT", "DELETE"],
        credentials: true

    })
];

export default securityMiddleware;