import { AppError } from "../../src/utils/AppError.js";

describe("AppError", () => {
  test("set message dan statusCode dengan benar", () => {
    const err = new AppError("Not found", 404);
    expect(err.message).toBe("Not found");
    expect(err.statusCode).toBe(404);
    expect(err.name).toBe("AppError");
  });

  test("default statusCode adalah 400", () => {
    const err = new AppError("Bad request");
    expect(err.statusCode).toBe(400);
  });

  test("instanceof Error", () => {
    expect(new AppError("test")).toBeInstanceOf(Error);
  });
});
