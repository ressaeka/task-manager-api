import request from "supertest";
import app from "../../src/app.js";
import pool from "../../src/config/db.js";

let token;
let taskId;
const testUser = { username: "testtaskuser1", password: "Password1!" };

beforeAll(async () => {
  await pool.query("DELETE FROM task WHERE user_id IN (SELECT id FROM users WHERE username = $1)", [testUser.username]);
  await pool.query("DELETE FROM users WHERE username = $1", [testUser.username]);
  await request(app).post("/api/v1/auth/register").send(testUser);
  const res = await request(app).post("/api/v1/auth/login").send(testUser);
  token = res.body.data.token;
});

afterAll(async () => {
  await pool.query("DELETE FROM task WHERE user_id IN (SELECT id FROM users WHERE username = $1)", [testUser.username]);
  await pool.query("DELETE FROM users WHERE username = $1", [testUser.username]);
  await pool.end();
});

const auth = () => ({ Authorization: `Bearer ${token}` });

describe("POST /api/v1/task", () => {
  test("buat task berhasil → 201", async () => {
    const res = await request(app)
      .post("/api/v1/task")
      .set(auth())
      .send({ title: "Task Pertama", description: "Deskripsi task" });
    expect(res.status).toBe(201);
    taskId = res.body.data.task.id;
  });

  test("buat task tanpa title → 400", async () => {
    const res = await request(app)
      .post("/api/v1/task")
      .set(auth())
      .send({ description: "Tanpa title" });
    expect(res.status).toBe(400);
  });

  test("buat task tanpa token → 401", async () => {
    const res = await request(app).post("/api/v1/task").send({ title: "Task Test" });
    expect(res.status).toBe(401);
  });
});

describe("GET /api/v1/task", () => {
  test("ambil semua task → 200", async () => {
    const res = await request(app).get("/api/v1/task").set(auth());
    expect(res.status).toBe(200);
    expect(res.body.data.tasks).toBeDefined();
  });

  test("filter status tidak valid → 400", async () => {
    const res = await request(app).get("/api/v1/task?status=invalid").set(auth());
    expect(res.status).toBe(400);
  });
});

describe("PUT /api/v1/task/:id", () => {
  test("update task berhasil → 200", async () => {
    const res = await request(app)
      .put(`/api/v1/task/${taskId}`)
      .set(auth())
      .send({ status: "in-progress" });
    expect(res.status).toBe(200);
  });

  test("update task tidak ditemukan → 404", async () => {
    const res = await request(app)
      .put("/api/v1/task/999999")
      .set(auth())
      .send({ status: "done" });
    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/v1/task/:id/soft", () => {
  test("soft delete task berhasil → 200", async () => {
    const res = await request(app).delete(`/api/v1/task/${taskId}/soft`).set(auth());
    expect(res.status).toBe(200);
  });

  test("soft delete task yang sudah dihapus → 400", async () => {
    const res = await request(app).delete(`/api/v1/task/${taskId}/soft`).set(auth());
    expect(res.status).toBe(400);
  });
});
