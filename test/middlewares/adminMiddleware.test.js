import { jest } from "@jest/globals";
import { adminMiddleware } from "../../src/middlewares/adminMiddleware.js";

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("adminMiddleware", () => {
  test("next() dipanggil jika role admin", () => {
    const req = { user: { id: 1, role: "admin" } };
    const res = mockRes();
    const next = jest.fn();

    adminMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  test("401 jika req.user tidak ada", () => {
    const req = {};
    const res = mockRes();
    const next = jest.fn();

    adminMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("403 jika role bukan admin", () => {
    const req = { user: { id: 1, role: "user" } };
    const res = mockRes();
    const next = jest.fn();

    adminMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });
});
