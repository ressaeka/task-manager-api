import request from "supertest";
import app from "../../src/app.js";
import pool from "../../src/config/db.js";

let adminToken;
let testUserId;
const adminUser = { username: "testadminuser1", password: "Password1!" };
const regularUser = { username: "testregularuser1", password: "Password1!" };

const auth = () => ({ Authorization: `Bearer ${adminToken}` });

beforeAll(async () => {
  // cleanup
  await pool.query("DELETE FROM task WHERE user_id IN (SELECT id FROM users WHERE username IN ($1, $2))", [adminUser.username, regularUser.username]);
  await pool.query("DELETE FROM users WHERE username IN ($1, $2)", [adminUser.username, regularUser.username]);

  // buat admin langsung ke DB
  const bcrypt = await import("bcrypt");
  const { customAlphabet } = await import("nanoid");
  const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 10);
  const hashed = await bcrypt.hash(adminUser.password, 10);
  await pool.query(
    "INSERT INTO users (public_id, username, password, role) VALUES ($1, $2, $3, 'admin')",
    [nanoid(), adminUser.username, hashed]
  );

  // buat regular user
  const hashed2 = await bcrypt.hash(regularUser.password, 10);
  const result = await pool.query(
    "INSERT INTO users (public_id, username, password, role) VALUES ($1, $2, $3, 'user') RETURNING id",
    [nanoid(), regularUser.username, hashed2]
  );
  testUserId = result.rows[0].id;

  // login admin
  const res = await request(app).post("/api/v1/auth/login").send(adminUser);
  adminToken = res.body.data.token;
});

afterAll(async () => {
  await pool.query("DELETE FROM task WHERE user_id IN (SELECT id FROM users WHERE username IN ($1, $2))", [adminUser.username, regularUser.username]);
  await pool.query("DELETE FROM users WHERE username IN ($1, $2)", [adminUser.username, regularUser.username]);
  await pool.end();
});

describe("GET /api/v1/admin/users", () => {
  test("ambil semua user → 200", async () => {
    const res = await request(app).get("/api/v1/admin/users").set(auth());
    expect(res.status).toBe(200);
    expect(res.body.data.users).toBeDefined();
  });

  test("filter role user → 200", async () => {
    const res = await request(app).get("/api/v1/admin/users?role=user").set(auth());
    expect(res.status).toBe(200);
  });

  test("filter role tidak valid → 400", async () => {
    const res = await request(app).get("/api/v1/admin/users?role=superadmin").set(auth());
    expect(res.status).toBe(400);
  });

  test("tanpa token → 401", async () => {
    const res = await request(app).get("/api/v1/admin/users");
    expect(res.status).toBe(401);
  });
});

describe("GET /api/v1/admin/users/:id", () => {
  test("ambil user by ID → 200", async () => {
    const res = await request(app).get(`/api/v1/admin/users/${testUserId}`).set(auth());
    expect(res.status).toBe(200);
    expect(res.body.data.user.id).toBe(testUserId);
  });

  test("ID tidak valid → 400", async () => {
    const res = await request(app).get("/api/v1/admin/users/abc").set(auth());
    expect(res.status).toBe(400);
  });

  test("user tidak ditemukan → 404", async () => {
    const res = await request(app).get("/api/v1/admin/users/999999").set(auth());
    expect(res.status).toBe(404);
  });
});

describe("GET /api/v1/admin/users/username/:username", () => {
  test("ambil user by username → 200", async () => {
    const res = await request(app).get(`/api/v1/admin/users/username/${regularUser.username}`).set(auth());
    expect(res.status).toBe(200);
  });

  test("username tidak ditemukan → 404", async () => {
    const res = await request(app).get("/api/v1/admin/users/username/tidakada999").set(auth());
    expect(res.status).toBe(404);
  });
});

describe("GET /api/v1/admin/task", () => {
  test("ambil semua task → 200", async () => {
    const res = await request(app).get("/api/v1/admin/task").set(auth());
    expect(res.status).toBe(200);
  });

  test("filter status tidak valid → 400", async () => {
    const res = await request(app).get("/api/v1/admin/task?status=invalid").set(auth());
    expect(res.status).toBe(400);
  });
});

describe("GET /api/v1/admin/dashboard", () => {
  test("ambil dashboard stats → 200", async () => {
    const res = await request(app).get("/api/v1/admin/dashboard").set(auth());
    expect(res.status).toBe(200);
    expect(res.body.data.stats).toBeDefined();
  });
});

describe("DELETE /api/v1/admin/users/:id/soft + restore", () => {
  test("soft delete user → 200", async () => {
    const res = await request(app).delete(`/api/v1/admin/users/${testUserId}/soft`).set(auth());
    expect(res.status).toBe(200);
  });

  test("soft delete user yang sudah dihapus → 400", async () => {
    const res = await request(app).delete(`/api/v1/admin/users/${testUserId}/soft`).set(auth());
    expect(res.status).toBe(400);
  });

  test("restore user → 200", async () => {
    const res = await request(app).post(`/api/v1/admin/users/${testUserId}/restore`).set(auth());
    expect(res.status).toBe(200);
  });
});

describe("DELETE /api/v1/admin/users/:id", () => {
  test("hard delete user → 200", async () => {
    const res = await request(app).delete(`/api/v1/admin/users/${testUserId}`).set(auth());
    expect(res.status).toBe(200);
  });

  test("delete user tidak ditemukan → 404", async () => {
    const res = await request(app).delete(`/api/v1/admin/users/${testUserId}`).set(auth());
    expect(res.status).toBe(404);
  });
});

describe("POST /api/v1/admin/create/admins", () => {
  test("buat admin baru → 201", async () => {
    const res = await request(app)
      .post("/api/v1/admin/create/admins")
      .set(auth())
      .send({ username: "newadmintest1", password: "Password1!" });
    expect(res.status).toBe(201);
    await pool.query("DELETE FROM users WHERE username = 'newadmintest1'");
  });

  test("buat admin duplikat → 409", async () => {
    const res = await request(app)
      .post("/api/v1/admin/create/admins")
      .set(auth())
      .send(adminUser);
    expect(res.status).toBe(409);
  });
});
