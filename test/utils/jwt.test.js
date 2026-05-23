import { generateToken, verifyToken } from "../../src/utils/jwt.js";

beforeAll(() => {
  process.env.JWT_SECRET = "test_secret";
  process.env.JWT_EXPIRES_IN = "1h";
});

describe("generateToken", () => {
  test("menghasilkan token string", () => {
    const token = generateToken({ id: 1, role: "user" });
    expect(typeof token).toBe("string");
    expect(token.split(".")).toHaveLength(3);
  });
});

describe("verifyToken", () => {
  test("mengembalikan payload yang benar", () => {
    const payload = { id: 1, role: "user" };
    const token = generateToken(payload);
    const decoded = verifyToken(token);
    expect(decoded.id).toBe(1);
    expect(decoded.role).toBe("user");
  });

  test("throw jika token tidak valid", () => {
    expect(() => verifyToken("token.tidak.valid")).toThrow();
  });

  test("throw jika token expired", () => {
    const token = generateToken({ id: 1 });
    // manipulate token signature
    const tampered = token.slice(0, -5) + "xxxxx";
    expect(() => verifyToken(tampered)).toThrow();
  });
});
