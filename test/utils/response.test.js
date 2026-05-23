import { jest } from "@jest/globals";
import { successResponse, errorResponse } from "../../src/utils/response.js";

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("successResponse", () => {
  test("default message dan status code", () => {
    const res = mockRes();
    successResponse(res, { id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "success",
      data: { id: 1 },
    });
  });

  test("custom message dan status code", () => {
    const res = mockRes();
    successResponse(res, null, "Created", 201);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Created",
      data: null,
    });
  });
});

describe("errorResponse", () => {
  test("default message dan status code", () => {
    const res = mockRes();
    errorResponse(res, "Bad request");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "Bad request",
    });
  });

  test("custom status code", () => {
    const res = mockRes();
    errorResponse(res, "Not found", 404);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "Not found",
    });
  });
});
