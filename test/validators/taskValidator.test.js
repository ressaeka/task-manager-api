import { validateTask, validateUpdateTask, validateDeadline } from "../../src/validators/taskValidator.js";
import { ValidationError } from "../../src/validators/ValidationError.js";

describe("validateTask", () => {
  test("lolos dengan input valid", () => {
    expect(() => validateTask({ title: "Belajar Jest" })).not.toThrow();
  });

  test("throw jika title kosong", () => {
    expect(() => validateTask({ title: "" })).toThrow("title harus diisi");
  });

  test("throw jika title kurang dari 5 karakter", () => {
    expect(() => validateTask({ title: "abc" })).toThrow("title minimal 5 karakter");
  });

  test("throw jika description lebih dari 255 karakter", () => {
    expect(() => validateTask({ title: "Valid Title", description: "a".repeat(256) }))
      .toThrow("description maksimal 255 karakter");
  });
});

describe("validateUpdateTask", () => {
  test("lolos jika semua field undefined", () => {
    expect(() => validateUpdateTask({})).not.toThrow();
  });

  test("throw jika title string kosong", () => {
    expect(() => validateUpdateTask({ title: "  " })).toThrow("title tidak boleh kosong");
  });

  test("throw jika status tidak valid", () => {
    expect(() => validateUpdateTask({ status: "invalid" }))
      .toThrow("status harus 'pending', 'in-progress', atau 'done'");
  });

  test("lolos dengan status valid", () => {
    expect(() => validateUpdateTask({ status: "done" })).not.toThrow();
  });
});

describe("validateDeadline", () => {
  test("lolos dengan tanggal valid", () => {
    expect(() => validateDeadline({ deadline_at: "2027-01-01" })).not.toThrow();
  });

  test("throw jika deadline kosong", () => {
    expect(() => validateDeadline({ deadline_at: "" })).toThrow("Deadline tidak boleh kosong");
  });

  test("throw jika format tidak valid", () => {
    expect(() => validateDeadline({ deadline_at: "bukan-tanggal" }))
      .toThrow("Format deadline tidak valid");
  });

  test("error adalah ValidationError", () => {
    expect(() => validateDeadline({ deadline_at: "" })).toThrow(ValidationError);
  });
});
