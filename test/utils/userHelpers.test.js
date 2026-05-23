import { hashPassword, generatePublicId } from "../../src/utils/userHelpers.js";

describe("hashPassword", () => {
  test("menghasilkan hash string", async () => {
    const hash = await hashPassword("Password1!");
    expect(typeof hash).toBe("string");
    expect(hash).not.toBe("Password1!");
  });

  test("hash berbeda untuk password yang sama", async () => {
    const hash1 = await hashPassword("Password1!");
    const hash2 = await hashPassword("Password1!");
    expect(hash1).not.toBe(hash2);
  });
});

describe("generatePublicId", () => {
  test("menghasilkan string 8 karakter", () => {
    const id = generatePublicId();
    expect(typeof id).toBe("string");
    expect(id.length).toBe(8);
  });

  test("hanya mengandung huruf besar dan angka", () => {
    const id = generatePublicId();
    expect(id).toMatch(/^[A-Z0-9]{8}$/);
  });

  test("setiap id unik", () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(generatePublicId());
    }
    expect(ids.size).toBe(100);
  });
});
