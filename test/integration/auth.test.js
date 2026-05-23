import request from "supertest";
import app from "../../src/app.js";
import pool from "../../src/config/db.js";

beforeAll(async () => {
  await pool.query("DELETE FROM users WHERE username LIKE 'testuser%'");
});

afterAll(async () => {
  await pool.query("DELETE FROM users WHERE username LIKE 'testuser%'");
  await pool.end();
});

const validUser = { username: "testuser1", password: "Password1!" };

describe("POST /api/v1/auth/register", () => {
  test("register berhasil → 201", async () => {
    const res = await request(app).post("/api/v1/auth/register").send(validUser);
    expect(res.status).toBe(201);
    expect(res.body.status).toBe("success");
  });

  test("register duplikat → 409", async () => {
    const res = await request(app).post("/api/v1/auth/register").send(validUser);
    expect(res.status).toBe(409);
  });

  test("register tanpa password → 400", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({ username: "testuser2" });
    expect(res.status).toBe(400);
  });
});

describe("POST /api/v1/auth/login", () => {
  test("login berhasil → 200 + token", async () => {
    const res = await request(app).post("/api/v1/auth/login").send(validUser);
    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeDefined();
  });

  test("login password salah → 401", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({ ...validUser, password: "WrongPass1!" });
    expect(res.status).toBe(401);
  });
});

describe("GET /api/v1/auth/profile", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post("/api/v1/auth/login").send(validUser);
    token = res.body.data.token;
  });

  test("profile berhasil dengan token valid → 200", async () => {
    const res = await request(app)
      .get("/api/v1/auth/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.username).toBe(validUser.username);
  });

  test("profile tanpa token → 401", async () => {
    const res = await request(app).get("/api/v1/auth/profile");
    expect(res.status).toBe(401);
  });
});
