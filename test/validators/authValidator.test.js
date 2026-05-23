import { validateAuth } from "../../src/validators/authValidator.js";
import { ValidationError } from "../../src/validators/ValidationError.js";

describe("validateAuth", () => {
  const valid = { username: "User1", password: "Password1!" };

  test("lolos validasi dengan input valid", () => {
    expect(() => validateAuth(valid)).not.toThrow();
  });

  test("throw jika username kosong", () => {
    expect(() => validateAuth({ ...valid, username: "" }))
      .toThrow(ValidationError);
  });

  test("throw jika password kosong", () => {
    expect(() => validateAuth({ ...valid, password: "" }))
      .toThrow(ValidationError);
  });

  test("throw jika username kurang dari 3 karakter", () => {
    expect(() => validateAuth({ ...valid, username: "ab" }))
      .toThrow("Username minimal 3 karakter");
  });

  test("throw jika password kurang dari 8 karakter", () => {
    expect(() => validateAuth({ ...valid, password: "Ab1!" }))
      .toThrow("Password minimal 8 karakter");
  });

  test("throw jika password tidak ada huruf besar", () => {
    expect(() => validateAuth({ ...valid, password: "password1!" }))
      .toThrow("Password harus mengandung huruf besar");
  });

  test("statusCode ValidationError adalah 400", () => {
    try {
      validateAuth({ username: "", password: "" });
    } catch (err) {
      expect(err.statusCode).toBe(400);
    }
  });
});
