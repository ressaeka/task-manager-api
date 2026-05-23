import { validatePagination, validateRole, validateTaskQuery } from "../../src/validators/queryValidator.js";

describe("validatePagination", () => {
  test("lolos dengan page dan limit valid", () => {
    expect(() => validatePagination({ page: 1, limit: 10 })).not.toThrow();
  });

  test("throw jika page kurang dari 1", () => {
    expect(() => validatePagination({ page: 0, limit: 10 })).toThrow("Page minimal 1");
  });

  test("throw jika limit kurang dari 1", () => {
    expect(() => validatePagination({ page: 1, limit: 0 })).toThrow("Limit minimal 1 dan maksimal 100");
  });

  test("throw jika limit lebih dari 100", () => {
    expect(() => validatePagination({ page: 1, limit: 101 })).toThrow("Limit minimal 1 dan maksimal 100");
  });
});

describe("validateRole", () => {
  test("lolos jika role undefined", () => {
    expect(() => validateRole(undefined)).not.toThrow();
  });

  test("lolos dengan role valid", () => {
    expect(() => validateRole("admin")).not.toThrow();
    expect(() => validateRole("user")).not.toThrow();
  });

  test("throw jika role tidak valid", () => {
    expect(() => validateRole("superadmin")).toThrow("Role harus 'user' atau 'admin'");
  });
});

describe("validateTaskQuery", () => {
  test("lolos dengan semua undefined", () => {
    expect(() => validateTaskQuery({})).not.toThrow();
  });

  test("throw jika status tidak valid", () => {
    expect(() => validateTaskQuery({ status: "selesai" }))
      .toThrow("Status harus pending, in-progress, atau done");
  });

  test("throw jika sort tidak valid", () => {
    expect(() => validateTaskQuery({ sort: "nama" }))
      .toThrow("Sort harus salah satu dari");
  });

  test("throw jika order tidak valid", () => {
    expect(() => validateTaskQuery({ order: "random" }))
      .toThrow("Order harus 'asc' atau 'desc'");
  });

  test("lolos dengan nilai valid semua", () => {
    expect(() => validateTaskQuery({ status: "done", sort: "created_at", order: "asc" }))
      .not.toThrow();
  });
});
