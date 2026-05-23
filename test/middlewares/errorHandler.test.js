import { jest } from "@jest/globals";
import { errorHandler } from "../../src/middlewares/errorHandler.js";
import { AppError } from "../../src/utils/AppError.js";
import { ValidationError } from "../../src/validators/ValidationError.js";

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("errorHandler", () => {
  const req = {};
  const next = jest.fn();

  test("handle TokenExpiredError → 401", () => {
    const err = new Error("jwt expired");
    err.name = "TokenExpiredError";
    const res = mockRes();
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("handle JsonWebTokenError → 401", () => {
    const err = new Error("invalid token");
    err.name = "JsonWebTokenError";
    const res = mockRes();
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("handle AppError dengan statusCode", () => {
    const err = new AppError("Not found", 404);
    const res = mockRes();
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Not found" }));
  });

  test("handle ValidationError → 400", () => {
    const err = new ValidationError("Input tidak valid");
    const res = mockRes();
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("fallback ke 500 untuk error tidak dikenal", () => {
    const err = new Error("unexpected");
    const res = mockRes();
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
