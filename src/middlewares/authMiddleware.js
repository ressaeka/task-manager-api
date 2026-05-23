import { errorResponse } from "../utils/response.js";
import { verifyToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return errorResponse(res, "Token wajib ada", 401);
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return errorResponse(res, "Format token salah", 401);
    }

    const token = parts[1];

    if (!process.env.JWT_SECRET) {
      throw new AppError("JWT_SECRET is not set in environment", 500);
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    return next();
  } catch (err) {
    return next(err)
  }
}
