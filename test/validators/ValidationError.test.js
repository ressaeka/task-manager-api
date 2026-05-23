import { ValidationError } from "../../src/validators/ValidationError.js";

describe("ValidationError", () => {
  test("set message dengan benar", () => {
    const err = new ValidationError("Input tidak valid");
    expect(err.message).toBe("Input tidak valid");
    expect(err.statusCode).toBe(400);
    expect(err.name).toBe("ValidationError");
  });

  test("instanceof Error", () => {
    expect(new ValidationError("test")).toBeInstanceOf(Error);
  });
});
