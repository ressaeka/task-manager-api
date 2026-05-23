import { jest } from "@jest/globals";
import { authMiddleware } from "../../src/middlewares/authMiddleware.js";
import { generateToken } from "../../src/utils/jwt.js";

beforeAll(() => {
  process.env.JWT_SECRET = "test_secret";
  process.env.JWT_EXPIRES_IN = "1h";
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("authMiddleware", () => {
  test("next() dipanggil jika token valid", () => {
    const token = generateToken({ id: 1, role: "user" });
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith();
    expect(req.user.id).toBe(1);
  });

  test("401 jika tidak ada token", () => {
    const req = { headers: {} };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("401 jika format bukan Bearer", () => {
    const req = { headers: { authorization: "Token abc123" } };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("next(err) jika token tidak valid", () => {
    const req = { headers: { authorization: "Bearer tokenpalsu" } };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
